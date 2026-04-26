import { ValidationError } from "../../lib/errors";
import { CreateEmployeeInput } from "./employee.types";

export const validateEmployeeInput = (input: CreateEmployeeInput) => {
  if (!input.firstName?.trim() || !input.lastName?.trim()) {
    throw new ValidationError("First name and last name are required");
  }

  if (!input.jobTitle?.trim()) {
    throw new ValidationError("Job title is required");
  }

  if (!input.department?.trim()) {
    throw new ValidationError("Department is required");
  }

  if (!input.country?.trim()) {
    throw new ValidationError("Country is required");
  }

  if (typeof input.salary !== "number" || input.salary <= 0) {
    throw new ValidationError("Salary must be a positive number");
  }

  if (input.experienceYears !== undefined && (typeof input.experienceYears !== "number" || input.experienceYears < 0)) {
    throw new ValidationError("Experience years must be a non-negative number");
  }
};

