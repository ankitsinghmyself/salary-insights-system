import { employeeRepository } from "../employee/employee.repository";
import { Employee } from "../employee/employee.types";

// Tax Brackets Configuration

// US: 30% flat tax
const US_TAX_RATE = 0.30;

// India: Progressive tax brackets (amounts in rupees)
const INDIA_TAX_BRACKETS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 0.05 },
  { min: 500000, max: 1000000, rate: 0.10 },
  { min: 1000000, max: 2000000, rate: 0.15 },
  { min: 2000000, max: 5000000, rate: 0.20 },
  { min: 5000000, max: Infinity, rate: 0.25 },
];

// Calculate tax deduction based on country
function calculateTaxDeduction(country: string, grossSalary: number): number {
  const countryLower = country.toLowerCase();

  if (countryLower === "usa" || countryLower === "united states" || countryLower === "us") {
    // US: 30% flat tax
    return Math.round(grossSalary * US_TAX_RATE);
  }

  if (countryLower === "india") {
    // India: Progressive tax brackets
    let tax = 0;
    let remainingSalary = grossSalary;

    for (const bracket of INDIA_TAX_BRACKETS) {
      if (remainingSalary <= 0) break;

      const taxableInBracket = Math.min(remainingSalary, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remainingSalary -= taxableInBracket;
    }

    return Math.round(tax);
  }

  // Default: no tax deduction for other countries
  return 0;
}

// Calculate gross salary (base salary is gross for now)
function calculateGrossSalary(baseSalary: number): number {
  return baseSalary;
}

// Calculate net salary after tax deduction
function calculateNetSalary(grossSalary: number, taxDeduction: number): number {
  return grossSalary - taxDeduction;
}

// Service functions

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

// New functions for gross salary, tax deduction, and net salary calculations

export type EmployeeSalaryDetails = {
  employeeId: string;
  baseSalary: number;
  grossSalary: number;
  taxDeduction: number;
  netSalary: number;
  country: string;
};

export const getEmployeeSalaryDetails = async (
  employeeId: string
): Promise<EmployeeSalaryDetails | null> => {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    return null;
  }

  const grossSalary = calculateGrossSalary(employee.salary);
  const taxDeduction = calculateTaxDeduction(employee.country, grossSalary);
  const netSalary = calculateNetSalary(grossSalary, taxDeduction);

  return {
    employeeId: employee.id,
    baseSalary: employee.salary,
    grossSalary,
    taxDeduction,
    netSalary,
    country: employee.country,
  };
};

export const getGrossSalary = async (employeeId: string): Promise<number | null> => {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    return null;
  }

  return calculateGrossSalary(employee.salary);
};

export const getTaxDeduction = async (employeeId: string): Promise<number | null> => {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    return null;
  }

  const grossSalary = calculateGrossSalary(employee.salary);
  return calculateTaxDeduction(employee.country, grossSalary);
};

export const getNetSalary = async (employeeId: string): Promise<number | null> => {
  const employee = await employeeRepository.findById(employeeId);

  if (!employee) {
    return null;
  }

  const grossSalary = calculateGrossSalary(employee.salary);
  const taxDeduction = calculateTaxDeduction(employee.country, grossSalary);
  return calculateNetSalary(grossSalary, taxDeduction);
};

