import { employeeRepository } from "../employee/employee.repository";
import { Employee } from "../employee/employee.types";

export const getSalaryStatsByCountry = async (
  country: string
): Promise<{ country: string; min: number; max: number; avg: number } | null> => {
  return employeeRepository.getSalaryStatsByCountry(country);
};

export const getAverageSalaryByRoleInCountry = async (
  country: string,
  jobTitle: string
): Promise<number | null> => {
  return employeeRepository.getAverageSalaryByRoleInCountry(country, jobTitle);
};

export const getOverallStats = async (): Promise<{
  min: number;
  max: number;
  avg: number;
  total: number;
}> => {
  return employeeRepository.getOverallStats();
};

export const getAverageSalaryByJobTitle = async (): Promise<
  { jobTitle: string; average: number; count: number }[]
> => {
  return employeeRepository.getAverageSalaryByJobTitle();
};

export const getTopEarners = async (
  country?: string,
  limit = 10
): Promise<Employee[]> => {
  return employeeRepository.getTopEarners(country, limit);
};

