import { CreateEmployeeInput, Employee, ListEmployeesParams } from "./employee.types";
import { validateEmployeeInput } from "./employee.validation";

// simple in-memory store (temporary)
const employeeStore = new Map<string, Employee>();

let currentId = 1;

export const createEmployee = async (
  input: CreateEmployeeInput
): Promise<Employee> => {
  validateEmployeeInput(input);

  const employee: Employee = {
    id: String(currentId++),
    ...input,
    fullName: `${input.firstName} ${input.lastName}`,
  };

  employeeStore.set(employee.id, employee);

  return employee;
};

export const getEmployeeById = async (
  id: string
): Promise<Employee | null> => {
  return employeeStore.get(id) || null;
};

export const updateEmployee = async (
  id: string,
  updates: Partial<CreateEmployeeInput>
): Promise<Employee | null> => {
  const existing = employeeStore.get(id);

  if (!existing) {
    return null;
  }

  const updatedEmployee: Employee = {
    ...existing,
    ...updates,
    fullName: `${updates.firstName ?? existing.firstName} ${
      updates.lastName ?? existing.lastName
    }`,
  };

  employeeStore.set(id, updatedEmployee);

  return updatedEmployee;
};
export const deleteEmployee = async (id: string): Promise<boolean> => {
  const exists = employeeStore.has(id);

  if (!exists) {
    return false;
  }

  employeeStore.delete(id);
  return true;
};
export const listEmployees = async (
  params: ListEmployeesParams = {}
): Promise<{ data: Employee[]; total: number }> => {
  const { limit, offset, country, jobTitle } = params;

  // convert Map → Array
  let employees = Array.from(employeeStore.values());

  // 🔹 Filtering (FIRST)
  if (country) {
    employees = employees.filter((e) => e.country === country);
  }

  if (jobTitle) {
    employees = employees.filter((e) => e.jobTitle === jobTitle);
  }

  const total = employees.length;

  // 🔹 Pagination (AFTER filtering)
  const paginated = employees.slice(
    offset ?? 0,
    (offset ?? 0) + (limit ?? employees.length)
  );

  return {
    data: paginated,
    total,
  };
};