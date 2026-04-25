import { CreateEmployeeInput, Employee, ListEmployeesParams } from "./employee.types";
import { validateEmployeeInput } from "./employee.validation";
import { employeeRepository } from "./employee.repository";

export const createEmployee = async (
  input: CreateEmployeeInput
): Promise<Employee> => {
  validateEmployeeInput(input);

  return await employeeRepository.create({
    ...input,
    fullName: `${input.firstName} ${input.lastName}`,
  });
};

export const getEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  return await employeeRepository.findById(id);
};

export const updateEmployee = async (
  id: string,
  updates: Partial<CreateEmployeeInput>
): Promise<Employee | null> => {
  const existing = await employeeRepository.findById(id);
  if (!existing) return null;

  const updated: Employee = {
    ...existing,
    ...updates,
    fullName: `${updates.firstName ?? existing.firstName} ${
      updates.lastName ?? existing.lastName
    }`,
  };

  return await employeeRepository.update(id, updated);
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  return await employeeRepository.delete(id);
};

export const listEmployees = async (
  params: ListEmployeesParams = {}
): Promise<{ data: Employee[]; total: number }> => {
  const { limit, offset, country, jobTitle } = params;

  let employees = await employeeRepository.findAll();

  if (country) {
    employees = employees.filter((e) => e.country === country);
  }

  if (jobTitle) {
    employees = employees.filter((e) => e.jobTitle === jobTitle);
  }

  const total = employees.length;

  const paginated = employees.slice(
    offset ?? 0,
    (offset ?? 0) + (limit ?? employees.length)
  );

  return { data: paginated, total };
};