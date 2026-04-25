import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  listEmployees,
} from "./employee.service";

describe("Employee Service - Create", () => {
  it("should create an employee with valid data", async () => {
    const input = {
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Frontend Engineer",
      country: "India",
      salary: 2000000,
    };

    const employee = await createEmployee(input);

    expect(employee).toBeDefined();
    expect(employee.id).toBeDefined();
    expect(employee.fullName).toBe("Ankit Singh");
    expect(employee.jobTitle).toBe(input.jobTitle);
  });
});

describe("Employee Service - Validation", () => {
  it("should throw error if first name is missing", async () => {
    const input = {
      firstName: "",
      lastName: "Singh",
      jobTitle: "Engineer",
      country: "India",
      salary: 2000000,
    };

    await expect(createEmployee(input)).rejects.toThrow(
      "First name and last name are required"
    );
  });

  it("should throw error if salary is less than or equal to 0", async () => {
    const input = {
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Engineer",
      country: "India",
      salary: 0,
    };

    await expect(createEmployee(input)).rejects.toThrow(
      "Salary must be greater than 0"
    );
  });

  it("should throw error if job title is missing", async () => {
    const input = {
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "",
      country: "India",
      salary: 2000000,
    };

    await expect(createEmployee(input)).rejects.toThrow(
      "Job title is required"
    );
  });
});

describe("Employee Service - Get", () => {
  it("should return employee by id", async () => {
    const created = await createEmployee({
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Frontend Engineer",
      country: "India",
      salary: 2000000,
    });

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
    const created = await createEmployee({
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Frontend Engineer",
      country: "India",
      salary: 2000000,
    });

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
    const created = await createEmployee({
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Engineer",
      country: "India",
      salary: 2000000,
    });

    const updated = await updateEmployee(created.id, {
      firstName: "Amit",
    });

    expect(updated?.fullName).toBe("Amit Singh");
  });
});

describe("Employee Service - Delete", () => {
  it("should delete an existing employee", async () => {
    const created = await createEmployee({
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Engineer",
      country: "India",
      salary: 2000000,
    });

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
      country: "India",
      salary: 2000000,
    });

    await createEmployee({
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Engineer",
      country: "USA",
      salary: 3000000,
    });

    await createEmployee({
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "Manager",
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
});