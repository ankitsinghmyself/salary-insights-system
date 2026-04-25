import { Employee } from "../employee/employee.types";
import { employeeStore } from "../employee/employee.service";

// helper
const getAllEmployees = (): Employee[] => {
  return Array.from(employeeStore.values());
};

export const getSalaryStatsByCountry = async (
  country: string
): Promise<{ min: number; max: number; avg: number } | null> => {
  const employees = getAllEmployees().filter(
    (e) => e.country === country
  );

  if (employees.length === 0) {
    return null;
  }

  const salaries = employees.map((e) => e.salary);

  const min = Math.min(...salaries);
  const max = Math.max(...salaries);
  const avg =
    salaries.reduce((sum, val) => sum + val, 0) / salaries.length;

  return { min, max, avg };
};

export const getAverageSalaryByRoleInCountry = async (
  country: string,
  jobTitle: string
): Promise<number | null> => {
  const employees = getAllEmployees().filter(
    (e) => e.country === country && e.jobTitle === jobTitle
  );

  if (employees.length === 0) {
    return null;
  }

  const total = employees.reduce((sum, e) => sum + e.salary, 0);

  return total / employees.length;
};