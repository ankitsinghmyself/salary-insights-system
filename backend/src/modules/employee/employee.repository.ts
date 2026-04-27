import { prisma } from "../../lib/prisma";
import { Employee, ListEmployeesParams } from "./employee.types";

type EmployeeCreateInput = Omit<Employee, "id" | "createdAt" | "updatedAt">;

function buildWhere(
  country?: string,
  jobTitle?: string,
  department?: string,
  search?: string
): { country?: { contains: string }; jobTitle?: string; department?: string; fullName?: { contains: string } } {
  const where: { country?: { contains: string }; jobTitle?: string; department?: string; fullName?: { contains: string } } = {};
  if (country) where.country = { contains: country };
  if (jobTitle) where.jobTitle = jobTitle;
  if (department) where.department = department;
  if (search?.trim()) {
    where.fullName = { contains: search.trim() };
  }
  return where;
}

export const employeeRepository = {
  async create(data: EmployeeCreateInput): Promise<Employee> {
    return prisma.employee.create({ data }) as Promise<Employee>;
  },

  async findById(id: string): Promise<Employee | null> {
    return prisma.employee.findUnique({ where: { id } }) as Promise<Employee | null>;
  },

  async update(id: string, data: Partial<EmployeeCreateInput>): Promise<Employee | null> {
    try {
      return (await prisma.employee.update({ where: { id }, data })) as Employee;
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.employee.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },

  async findMany(params: ListEmployeesParams): Promise<Employee[]> {
    const { limit, offset, country, jobTitle, department, search } = params;
    const where = buildWhere(country, jobTitle, department, search);

    const query: {
      where: typeof where;
      skip: number;
      take?: number;
      orderBy: { createdAt: "desc" };
    } = {
      where,
      skip: offset ?? 0,
      orderBy: { createdAt: "desc" },
    };

    if (limit !== undefined) {
      query.take = limit;
    }

    return prisma.employee.findMany(query) as Promise<Employee[]>;
  },

  async count(params: Pick<ListEmployeesParams, "country" | "jobTitle" | "department" | "search">): Promise<number> {
    const { country, jobTitle, department, search } = params;
    const where = buildWhere(country, jobTitle, department, search);

    return prisma.employee.count({ where });
  },

  async getSalaryStatsByCountry(country: string): Promise<{ country: string; min: number; max: number; avg: number } | null> {
    const result = await prisma.employee.aggregate({
      where: { country: { contains: country } },
      _min: { salary: true },
      _max: { salary: true },
      _avg: { salary: true },
    });

    if (result._min.salary === null) return null;

    const firstMatch = await prisma.employee.findFirst({
      where: { country: { contains: country } },
      select: { country: true },
    });

    return {
      country: firstMatch!.country,
      min: result._min.salary,
      max: result._max.salary!,
      avg: Math.round(result._avg.salary!),
    };
  },

  async getAverageSalaryByRoleInCountry(country: string, jobTitle: string): Promise<number | null> {
    const result = await prisma.employee.aggregate({
      where: { country: { contains: country }, jobTitle },
      _avg: { salary: true },
    });

    if (result._avg.salary === null) return null;

    return Math.round(result._avg.salary);
  },

  async getOverallStats(): Promise<{ min: number; max: number; avg: number; total: number }> {
    const [aggregate, total] = await Promise.all([
      prisma.employee.aggregate({
        _min: { salary: true },
        _max: { salary: true },
        _avg: { salary: true },
      }),
      prisma.employee.count(),
    ]);

    return {
      min: aggregate._min.salary ?? 0,
      max: aggregate._max.salary ?? 0,
      avg: Math.round(aggregate._avg.salary ?? 0),
      total,
    };
  },

  async getAverageSalaryByJobTitle(): Promise<{ jobTitle: string; average: number; count: number }[]> {
    const results = await prisma.employee.groupBy({
      by: ["jobTitle"],
      _avg: { salary: true },
      _count: { id: true },
    });

    return results.map((r) => ({
      jobTitle: r.jobTitle,
      average: Math.round(r._avg.salary!),
      count: r._count.id,
    }));
  },

  async getTopEarners(country?: string, limit = 10): Promise<Employee[]> {
    const query: {
      where?: { country: { contains: string } };
      orderBy: { salary: "desc" };
      take: number;
    } = {
      orderBy: { salary: "desc" },
      take: limit,
    };

    if (country) {
      query.where = { country: { contains: country } };
    }

    return prisma.employee.findMany(query) as Promise<Employee[]>;
  },

  async clear(): Promise<void> {
    await prisma.employee.deleteMany();
  },
};
