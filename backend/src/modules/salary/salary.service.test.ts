import { createEmployee, employeeStore } from "../employee/employee.service";
import {
  getSalaryStatsByCountry,
  getAverageSalaryByRoleInCountry,
} from "./salary.service";

describe("Salary Service - Insights", () => {
  beforeEach(async () => {
    employeeStore.clear();

    await createEmployee({
      firstName: "A",
      lastName: "One",
      jobTitle: "Engineer",
      country: "India",
      salary: 100,
    });

    await createEmployee({
      firstName: "B",
      lastName: "Two",
      jobTitle: "Engineer",
      country: "India",
      salary: 300,
    });

    await createEmployee({
      firstName: "C",
      lastName: "Three",
      jobTitle: "Manager",
      country: "India",
      salary: 500,
    });

    await createEmployee({
      firstName: "D",
      lastName: "Four",
      jobTitle: "Engineer",
      country: "USA",
      salary: 1000,
    });
  });

  it("should return min, max, and average salary for a country", async () => {
    const stats = await getSalaryStatsByCountry("India");

    expect(stats?.min).toBe(100);
    expect(stats?.max).toBe(500);
    expect(stats?.avg).toBe(300);
  });

  it("should return average salary by job title within a country", async () => {
    const avg = await getAverageSalaryByRoleInCountry("India", "Engineer");

    expect(avg).toBe(200);
  });

  it("should return null if no employees exist for country", async () => {
    const stats = await getSalaryStatsByCountry("Germany");

    expect(stats).toBeNull();
  });
});