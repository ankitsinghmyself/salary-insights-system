type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  country: string;
  salary: number;
};

type Employee = CreateEmployeeInput & {
  id: string;
  fullName: string;
};

export const createEmployee = async (
  input: CreateEmployeeInput
): Promise<Employee> => {
  return {
    id: "1", // temporary (will replace later)
    ...input,
    fullName: `${input.firstName} ${input.lastName}`,
  };
};