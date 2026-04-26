import request from "supertest";
import app from "../../app/app";
import { employeeRepository } from "./employee.repository";

const validEmployee = {
  firstName: "Ankit",
  lastName: "Singh",
  jobTitle: "Frontend Engineer",
  department: "Engineering",
  country: "India",
  salary: 2000000,
};

describe("Employee Routes", () => {
  beforeEach(async () => {
    await employeeRepository.clear();
  });

  describe("POST /api/employees", () => {
    it("should create an employee", async () => {
      const res = await request(app)
        .post("/api/employees")
        .send(validEmployee)
        .expect(201);

      expect(res.body.firstName).toBe(validEmployee.firstName);
      expect(res.body.fullName).toBe("Ankit Singh");
      expect(res.body.department).toBe("Engineering");
    });

    it("should return 400 for invalid input", async () => {
      const res = await request(app)
        .post("/api/employees")
        .send({ ...validEmployee, salary: 0 })
        .expect(400);

      expect(res.body.message).toContain("Salary");
    });
  });

  describe("GET /api/employees", () => {
    it("should list employees with pagination", async () => {
      await request(app).post("/api/employees").send(validEmployee).expect(201);
      await request(app)
        .post("/api/employees")
        .send({ ...validEmployee, firstName: "John", lastName: "Doe", country: "USA" })
        .expect(201);

      const res = await request(app).get("/api/employees?limit=1").expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.total).toBe(2);
    });

    it("should filter by country", async () => {
      await request(app).post("/api/employees").send(validEmployee).expect(201);
      await request(app)
        .post("/api/employees")
        .send({ ...validEmployee, firstName: "John", country: "USA" })
        .expect(201);

      const res = await request(app).get("/api/employees?country=USA").expect(200);

      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].country).toBe("USA");
    });
  });

  describe("GET /api/employees/:id", () => {
    it("should get employee by id", async () => {
      const createRes = await request(app)
        .post("/api/employees")
        .send(validEmployee)
        .expect(201);

      const res = await request(app)
        .get(`/api/employees/${createRes.body.id}`)
        .expect(200);

      expect(res.body.id).toBe(createRes.body.id);
    });

    it("should return 404 for non-existent id", async () => {
      await request(app).get("/api/employees/non-existent").expect(404);
    });
  });

  describe("PUT /api/employees/:id", () => {
    it("should update an employee", async () => {
      const createRes = await request(app)
        .post("/api/employees")
        .send(validEmployee)
        .expect(201);

      const res = await request(app)
        .put(`/api/employees/${createRes.body.id}`)
        .send({ jobTitle: "Senior Engineer", salary: 3000000 })
        .expect(200);

      expect(res.body.jobTitle).toBe("Senior Engineer");
      expect(res.body.salary).toBe(3000000);
    });

    it("should return 404 for non-existent id", async () => {
      await request(app)
        .put("/api/employees/non-existent")
        .send({ jobTitle: "Test" })
        .expect(404);
    });
  });

  describe("DELETE /api/employees/:id", () => {
    it("should delete an employee", async () => {
      const createRes = await request(app)
        .post("/api/employees")
        .send(validEmployee)
        .expect(201);

      await request(app)
        .delete(`/api/employees/${createRes.body.id}`)
        .expect(204);

      await request(app).get(`/api/employees/${createRes.body.id}`).expect(404);
    });

    it("should return 404 for non-existent id", async () => {
      await request(app).delete("/api/employees/non-existent").expect(404);
    });
  });
});
