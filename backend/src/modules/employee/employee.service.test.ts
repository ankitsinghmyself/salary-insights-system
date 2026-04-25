import { createEmployee } from "./employee.service";

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