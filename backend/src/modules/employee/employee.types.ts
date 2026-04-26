export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  experienceYears?: number;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  experienceYears: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ListEmployeesParams = {
  limit?: number;
  offset?: number;
  country?: string;
  jobTitle?: string;
  department?: string;
  search?: string;
};
