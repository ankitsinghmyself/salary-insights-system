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
  createdAt: string;
  updatedAt: string;
};

export type CreateEmployeeInput = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  country: string;
  salary: number;
  experienceYears?: number;
};

export type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

export type ListEmployeesParams = {
  limit?: number;
  offset?: number;
  country?: string;
  jobTitle?: string;
  department?: string;
  search?: string;
};

export type PaginatedEmployees = {
  data: Employee[];
  total: number;
};

export type SalaryStats = {
  min: number;
  max: number;
  avg: number;
  total: number;
};

export type JobTitleAverage = {
  jobTitle: string;
  average: number;
  count: number;
};

export type TopEarner = {
  id: string;
  fullName: string;
  jobTitle: string;
  country: string;
  salary: number;
};

