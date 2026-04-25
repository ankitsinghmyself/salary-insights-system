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