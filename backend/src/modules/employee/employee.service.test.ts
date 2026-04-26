import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  listEmployees,
} from "./employee.service";
import { employeeRepository } from "./employee.repository";
import { ValidationError } from "../../lib/errors";

const validEmployee = {
  firstName: "Ankit",
  lastName: "Singh",
  jobTitle: "Frontend Engineer",
  department: "Engineering",
  country: "India",
  salary: 2000000,
};

describe("Employee Service - Create", () => {
  it("should create an employee with valid data", async () => {
    const employee = await createEmployee(validEmployee);

    expect(employee).toBeDefined();
    expect(employee.id).toBeDefined();
    expect(employee.fullName).toBe("Ankit Singh");
    expect(employee.jobTitle).toBe(validEmployee.jobTitle);
    expect(employee.department).toBe("Engineering");
    expect(employee.experienceYears).toBe(0);
  });

  it("should create an employee with experience years", async () => {
    const employee = await createEmployee({
      ...validEmployee,
      firstName: "Test",
      experienceYears: 5,
    });

    expect(employee.experienceYears).toBe(5);
  });
});

describe("Employee Service - Validation", () => {
  it("should throw error if first name is missing", async () => {
    await expect(
      createEmployee({ ...validEmployee, firstName: "" })
    ).rejects.toThrow("First name and last name are required");
  });

  it("should throw error if salary is less than or equal to 0", async () => {
    await expect(
      createEmployee({ ...validEmployee, salary: 0 })
    ).rejects.toThrow("Salary must be a positive number");
  });

  it("should throw error if job title is missing", async () => {
    await expect(
      createEmployee({ ...validEmployee, jobTitle: "" })
    ).rejects.toThrow("Job title is required");
  });

  it("should throw error if department is missing", async () => {
    await expect(
      createEmployee({ ...validEmployee, department: "" })
    ).rejects.toThrow("Department is required");
  });

  it("should throw error if experience years is negative", async () => {
    await expect(
      createEmployee({ ...validEmployee, experienceYears: -1 })
    ).rejects.toThrow("Experience years must be a non-negative number");
  });
});

describe("Employee Service - Get", () => {
  it("should return employee by id", async () => {
    const created = await createEmployee(validEmployee);

    const result = await getEmployeeById(created.id);

    expect(result).toBeDefined();
    expect(result?.id).toBe(created.id);
    expect(result?.fullName).toBe("Ankit Singh");
  });

  it("should return null if employee does not exist", async () => {
    const result = await getEmployeeById("non-existent-id");
    expect(result).toBeNull();
  });
});

describe("Employee Service - Update", () => {
  it("should update an existing employee", async () => {
    const created = await createEmployee(validEmployee);

    const updated = await updateEmployee(created.id, {
      jobTitle: "Senior Frontend Engineer",
      salary: 2500000,
    });

    expect(updated).toBeDefined();
    expect(updated?.jobTitle).toBe("Senior Frontend Engineer");
    expect(updated?.salary).toBe(2500000);
    expect(updated?.fullName).toBe("Ankit Singh");
  });

  it("should return null if employee does not exist", async () => {
    const result = await updateEmployee("invalid-id", {
      jobTitle: "Something",
    });

    expect(result).toBeNull();
  });

  it("should update fullName if firstName or lastName changes", async () => {
    const created = await createEmployee(validEmployee);

    const updated = await updateEmployee(created.id, {
      firstName: "Amit",
    });

    expect(updated?.fullName).toBe("Amit Singh");
  });

  it("should update department", async () => {
    const created = await createEmployee(validEmployee);

    const updated = await updateEmployee(created.id, {
      department: "Product",
    });

    expect(updated?.department).toBe("Product");
  });
});

describe("Employee Service - Delete", () => {
  it("should delete an existing employee", async () => {
    const created = await createEmployee(validEmployee);

    const result = await deleteEmployee(created.id);

    expect(result).toBe(true);

    const fetched = await getEmployeeById(created.id);
    expect(fetched).toBeNull();
  });

  it("should return false if employee does not exist", async () => {
    const result = await deleteEmployee("invalid-id");
    expect(result).toBe(false);
  });
});

describe("Employee Service - List", () => {
  beforeEach(async () => {
    await createEmployee({
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Engineer",
      department: "Engineering",
      country: "India",
      salary: 2000000,
    });

    await createEmployee({
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Engineer",
      department: "Engineering",
      country: "USA",
      salary: 3000000,
    });

    await createEmployee({
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "Manager",
      department: "HR",
      country: "India",
      salary: 4000000,
    });
  });

  it("should return all employees", async () => {
    const result = await listEmployees();

    expect(result.data.length).toBeGreaterThanOrEqual(3);
    expect(result.total).toBeGreaterThanOrEqual(3);
  });

  it("should support pagination", async () => {
    const result = await listEmployees({ limit: 2, offset: 0 });

    expect(result.data.length).toBe(2);
  });

  it("should filter by country", async () => {
    const result = await listEmployees({ country: "India" });

    expect(result.data.every((e) => e.country === "India")).toBe(true);
  });

  it("should filter by job title", async () => {
    const result = await listEmployees({ jobTitle: "Manager" });

    expect(result.data.every((e) => e.jobTitle === "Manager")).toBe(true);
  });

  it("should filter by department", async () => {
    const result = await listEmployees({ department: "Engineering" });

    expect(result.data.every((e) => e.department === "Engineering")).toBe(true);
  });

  it("should apply multiple filters", async () => {
    const result = await listEmployees({ country: "India", jobTitle: "Engineer" });

    expect(result.data.every((e) => e.country === "India" && e.jobTitle === "Engineer")).toBe(true);
  });

  it("should search by full name", async () => {
    const result = await listEmployees({ search: "Ankit" });

    expect(result.data.length).toBe(1);
    expect(result.data[0]?.fullName).toBe("Ankit Singh");
    expect(result.total).toBe(1);
  });

  it("should search case-insensitively", async () => {
    const result = await listEmployees({ search: "ankit" });

    expect(result.data.length).toBe(1);
    expect(result.data[0]?.fullName).toBe("Ankit Singh");
  });

  it("should search with partial match", async () => {
    const result = await listEmployees({ search: "Singh" });

    expect(result.data.length).toBe(1);
    expect(result.data[0]?.fullName).toBe("Ankit Singh");
  });

  it("should combine search with filters", async () => {
    const result = await listEmployees({ country: "India", search: "Engineer" });

    // "Engineer" is in jobTitle, not fullName, so should return 0 for fullName search
    expect(result.data.length).toBe(0);
  });

  it("should return empty for non-matching search", async () => {
    const result = await listEmployees({ search: "NonExistent" });

    expect(result.data.length).toBe(0);
    expect(result.total).toBe(0);
  });

  it("should throw ValidationError for invalid input", async () => {
    await expect(createEmployee({ ...validEmployee, salary: 0 })).rejects.toBeInstanceOf(
      ValidationError
    );
  });
});

beforeEach(async () => {
  await employeeRepository.clear();
});
