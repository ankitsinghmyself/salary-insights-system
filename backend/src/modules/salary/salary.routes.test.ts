import request from "supertest";
import app from "../../app/app";
import { createEmployee } from "../employee/employee.service";
import { employeeRepository } from "../employee/employee.repository";

const baseEmployee = {
  firstName: "Test",
  lastName: "User",
  department: "Engineering",
};

describe("Salary Routes", () => {
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
  });

  describe("GET /api/salary/stats/:country", () => {
    it("should return salary stats for a country", async () => {
      const res = await request(app).get("/api/salary/stats/India").expect(200);

      expect(res.body.country).toBe("India");
      expect(res.body.min).toBe(100);
      expect(res.body.max).toBe(500);
      expect(res.body.avg).toBe(300);
    });

    it("should return salary stats case-insensitively", async () => {
      const res = await request(app).get("/api/salary/stats/india").expect(200);

      expect(res.body.country).toBe("India");
      expect(res.body.min).toBe(100);
      expect(res.body.max).toBe(500);
      expect(res.body.avg).toBe(300);
    });

    it("should return 404 for country with no employees", async () => {
      await request(app).get("/api/salary/stats/Germany").expect(404);
    });
  });

  describe("GET /api/salary/average/:country/:jobTitle", () => {
    it("should return average salary for role in country", async () => {
      const res = await request(app)
        .get("/api/salary/average/India/Engineer")
        .expect(200);

      expect(res.body.average).toBe(200);
    });

    it("should return 404 for non-existent role/country", async () => {
      await request(app).get("/api/salary/average/India/Designer").expect(404);
    });
  });

  describe("GET /api/salary/overall-stats", () => {
    it("should return overall salary stats", async () => {
      const res = await request(app).get("/api/salary/overall-stats").expect(200);

      expect(res.body.total).toBe(3);
      expect(res.body.min).toBe(100);
      expect(res.body.max).toBe(500);
      expect(res.body.avg).toBe(300);
    });
  });

  describe("GET /api/salary/by-jobtitle", () => {
    it("should return average salary by job title", async () => {
      const res = await request(app).get("/api/salary/by-jobtitle").expect(200);

      expect(Array.isArray(res.body)).toBe(true);

      const engineerEntry = res.body.find((r: any) => r.jobTitle === "Engineer");
      expect(engineerEntry.average).toBe(200);
      expect(engineerEntry.count).toBe(2);
    });
  });

  describe("GET /api/salary/top-earners", () => {
    it("should return top earners globally", async () => {
      const res = await request(app)
        .get("/api/salary/top-earners?limit=2")
        .expect(200);

      expect(res.body.length).toBe(2);
      expect(res.body[0].salary).toBe(500);
      expect(res.body[1].salary).toBe(300);
    });

    it("should filter top earners by country", async () => {
      await createEmployee({
        ...baseEmployee,
        firstName: "D",
        lastName: "Four",
        jobTitle: "Engineer",
        country: "USA",
        salary: 1000,
      });

      const res = await request(app)
        .get("/api/salary/top-earners?country=India&limit=2")
        .expect(200);

      expect(res.body.length).toBe(2);
      expect(res.body.every((e: any) => e.country === "India")).toBe(true);
    });
  });
});
