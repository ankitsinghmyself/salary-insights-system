import {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
} from "./employee.service";

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