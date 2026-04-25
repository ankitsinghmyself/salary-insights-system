import { prisma  } from "../../lib/prisma";
import { Employee } from "./employee.types";
export const employeeRepository = {
  async create(data: Omit<Employee, "id">): Promise<Employee> {
    const employee = await prisma.employee.create({
      data,
    });

    return employee;
  },

  async findById(id: string): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { id },
    });
  },

  async update(id: string, updated: Employee): Promise<Employee | null> {
    try {
      const employee = await prisma.employee.update({
        where: { id },
        data: updated,
      });

      return employee;
    } catch {
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.employee.delete({
        where: { id },
      });

      return true;
    } catch {
      return false;
    }
  },

  async findAll(): Promise<Employee[]> {
    return prisma.employee.findMany();
  },

  // for tests
  async clear() {
    await prisma.employee.deleteMany();
  },
};