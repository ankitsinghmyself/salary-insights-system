import { createEmployee, getEmployeeById } from "./employee.service";

describe("Employee Service - Get", () => {
  it("should return employee by id", async () => {
    const input = {
      firstName: "Ankit",
      lastName: "Singh",
      jobTitle: "Frontend Engineer",
      country: "India",
      salary: 2000000,
    };

    const created = await createEmployee(input);

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