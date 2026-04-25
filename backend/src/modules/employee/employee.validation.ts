import { CreateEmployeeInput } from "./employee.types";

export const validateEmployeeInput = (input: CreateEmployeeInput) => {
  if (!input.firstName || !input.lastName) {
    throw new Error("First name and last name are required");
  }

  if (!input.jobTitle) {
    throw new Error("Job title is required");
  }

  if (!input.country) {
    throw new Error("Country is required");
  }

  if (input.salary <= 0) {
    throw new Error("Salary must be greater than 0");
  }
};