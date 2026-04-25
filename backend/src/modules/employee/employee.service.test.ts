import {
  createEmployee,
  getEmployeeById,
  updateEmployee,
} from "./employee.service";

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
    expect(updated?.fullName).toBe("Ankit Singh"); // unchanged
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