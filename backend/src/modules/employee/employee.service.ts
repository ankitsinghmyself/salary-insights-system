import { CreateEmployeeInput, Employee, ListEmployeesParams } from "./employee.types";
import { validateEmployeeInput } from "./employee.validation";
import { employeeRepository } from "./employee.repository";

export const createEmployee = async (input: CreateEmployeeInput): Promise<Employee> => {
  validateEmployeeInput(input);

  return employeeRepository.create({
    ...input,
    experienceYears: input.experienceYears ?? 0,
    fullName: `${input.firstName.trim()} ${input.lastName.trim()}`,
  });
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  return employeeRepository.findById(id);
};

export const updateEmployee = async (
  id: string,
  updates: Partial<CreateEmployeeInput>
): Promise<Employee | null> => {
  const existing = await employeeRepository.findById(id);
  if (!existing) return null;

  const updatedFullName =
    updates.firstName || updates.lastName
      ? `${(updates.firstName ?? existing.firstName).trim()} ${(updates.lastName ?? existing.lastName).trim()}`
      : existing.fullName;

  return employeeRepository.update(id, {
    ...updates,
    fullName: updatedFullName,
  });
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  return employeeRepository.delete(id);
};

export const listEmployees = async (
  params: ListEmployeesParams = {}
): Promise<{ data: Employee[]; total: number }> => {
  const [data, total] = await Promise.all([
    employeeRepository.findMany(params),
    employeeRepository.count(params),
  ]);

  return { data, total };
};

