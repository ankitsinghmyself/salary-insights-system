import { createEmployee } from "../employee/employee.service";
import {
  getSalaryStatsByCountry,
  getAverageSalaryByRoleInCountry,
  getOverallStats,
  getAverageSalaryByJobTitle,
  getTopEarners,
} from "./salary.service";
import { employeeRepository } from "../employee/employee.repository";

const baseEmployee = {
  firstName: "Test",
  lastName: "User",
  department: "Engineering",
};

describe("Salary Service - Insights", () => {
  beforeEach(async () => {
    await employeeRepository.clear();

    await createEmployee({
      ...baseEmployee,
      firstName: "A",
      lastName: "One",
      jobTitle: "Engineer",
      country: "India",
      salary: 100,
    });

    await createEmployee({
      ...baseEmployee,
      firstName: "B",
      lastName: "Two",
      jobTitle: "Engineer",
      country: "India",
      salary: 300,
    });

    await createEmployee({
      ...baseEmployee,
      firstName: "C",
      lastName: "Three",
      jobTitle: "Manager",
      country: "India",
      salary: 500,
    });

    await createEmployee({
      ...baseEmployee,
      firstName: "D",
      lastName: "Four",
      jobTitle: "Engineer",
      country: "USA",
      salary: 1000,
    });
  });

  it("should return min, max, and average salary for a country", async () => {
    const stats = await getSalaryStatsByCountry("India");

    expect(stats!.country).toBe("India");
    expect(stats!.min).toBe(100);
    expect(stats!.max).toBe(500);
    expect(stats!.avg).toBe(300);
  });

  it("should return salary stats case-insensitively", async () => {
    const stats = await getSalaryStatsByCountry("india");

    expect(stats!.country).toBe("India");
    expect(stats!.min).toBe(100);
    expect(stats!.max).toBe(500);
    expect(stats!.avg).toBe(300);
  });

  it("should return average salary by job title within a country", async () => {
    const avg = await getAverageSalaryByRoleInCountry("India", "Engineer");

    expect(avg).toBe(200); // (100 + 300) / 2
  });

  it("should return null if no employees exist for country", async () => {
    const stats = await getSalaryStatsByCountry("Germany");

    expect(stats).toBeNull();
  });

  it("should return null if no employees exist for role/country", async () => {
    const avg = await getAverageSalaryByRoleInCountry("India", "Designer");

    expect(avg).toBeNull();
  });

  it("should return overall stats across all employees", async () => {
    const stats = await getOverallStats();

    expect(stats.min).toBe(100);
    expect(stats.max).toBe(1000);
    expect(stats.avg).toBe(475); // (100 + 300 + 500 + 1000) / 4 = 475
    expect(stats.total).toBe(4);
  });

  it("should return average salary grouped by job title", async () => {
    const result = await getAverageSalaryByJobTitle();

    const engineerEntry = result.find((r) => r.jobTitle === "Engineer");
    const managerEntry = result.find((r) => r.jobTitle === "Manager");

    expect(engineerEntry).toBeDefined();
    expect(engineerEntry!.average).toBe(467); // (100 + 300 + 1000) / 3 = 467
    expect(engineerEntry!.count).toBe(3);

    expect(managerEntry).toBeDefined();
    expect(managerEntry!.average).toBe(500);
    expect(managerEntry!.count).toBe(1);
  });

  it("should return top earners globally", async () => {
    const result = await getTopEarners(undefined, 3);

    expect(result.length).toBe(3);
    expect(result[0].salary).toBe(1000);
    expect(result[1].salary).toBe(500);
    expect(result[2].salary).toBe(300);
  });

  it("should return top earners by country", async () => {
    const result = await getTopEarners("India", 2);

    expect(result.length).toBe(2);
    expect(result[0].salary).toBe(500);
    expect(result[1].salary).toBe(300);
    expect(result.every((e) => e.country === "India")).toBe(true);
  });
});
