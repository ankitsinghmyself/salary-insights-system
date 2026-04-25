import { CreateEmployeeInput, Employee } from "./employee.types";
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