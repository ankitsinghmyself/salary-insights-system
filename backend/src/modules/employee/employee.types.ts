export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  country: string;
  salary: number;
};

export type Employee = CreateEmployeeInput & {
  id: string;
  fullName: string;
};

export type ListEmployeesParams = {
  limit?: number;
  offset?: number;
  country?: string;
  jobTitle?: string;
};