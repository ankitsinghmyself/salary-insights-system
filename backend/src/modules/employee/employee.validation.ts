import { CreateEmployeeInput } from "./employee.types";

export const validateEmployeeInput = (input: CreateEmployeeInput) => {
  if (!input.firstName?.trim() || !input.lastName?.trim()) {
    throw new Error("First name and last name are required");
  }

  if (!input.jobTitle?.trim()) {
    throw new Error("Job title is required");
  }

  if (!input.department?.trim()) {
    throw new Error("Department is required");
  }

  if (!input.country?.trim()) {
    throw new Error("Country is required");
  }

  if (typeof input.salary !== "number" || input.salary <= 0) {
    throw new Error("Salary must be a positive number");
  }

  if (input.experienceYears !== undefined && (typeof input.experienceYears !== "number" || input.experienceYears < 0)) {
    throw new Error("Experience years must be a non-negative number");
  }
};

