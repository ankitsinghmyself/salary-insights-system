import { CreateEmployeeInput, Employee } from "./employee.types";
import { validateEmployeeInput } from "./employee.validation";

export const createEmployee = async (
  input: CreateEmployeeInput
): Promise<Employee> => {
  validateEmployeeInput(input);

  return {
    id: "1", // still temporary
    ...input,
    fullName: `${input.firstName} ${input.lastName}`,
  };
};