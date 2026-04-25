import { employeeRepository } from "../employee/employee.repository";

const getAllEmployees = () => employeeRepository.findAll();

export const getSalaryStatsByCountry = async (country: string) => {
  const employees = getAllEmployees().filter(
    (e) => e.country === country
  );

  if (employees.length === 0) return null;

  const salaries = employees.map((e) => e.salary);

  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries),
    avg:
      salaries.reduce((sum, val) => sum + val, 0) / salaries.length,
  };
};

export const getAverageSalaryByRoleInCountry = async (
  country: string,
  jobTitle: string
) => {
  const employees = getAllEmployees().filter(
    (e) => e.country === country && e.jobTitle === jobTitle
  );

  if (employees.length === 0) return null;

  return (
    employees.reduce((sum, e) => sum + e.salary, 0) /
    employees.length
  );
};