import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./client";
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employees";
import type { Employee, PaginatedEmployees } from "./types";

vi.mock("./client", () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockEmployee: Employee = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  jobTitle: "Engineer",
  department: "Engineering",
  country: "USA",
  salary: 100000,
  experienceYears: 5,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

describe("employees API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("listEmployees", () => {
    it("should fetch employees with default params", async () => {
      const mockResponse: PaginatedEmployees = {
        data: [mockEmployee],
        total: 1,
      };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse });

      const result = await listEmployees();

      expect(apiClient.get).toHaveBeenCalledWith("/employees", { params: {} });
      expect(result).toEqual(mockResponse);
    });

    it("should fetch employees with filters", async () => {
      const mockResponse: PaginatedEmployees = {
        data: [mockEmployee],
        total: 1,
      };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse });

      const result = await listEmployees({
        country: "USA",
        jobTitle: "Engineer",
        limit: 10,
        offset: 0,
        search: "John",
      });

      expect(apiClient.get).toHaveBeenCalledWith("/employees", {
        params: {
          country: "USA",
          jobTitle: "Engineer",
          limit: 10,
          offset: 0,
          search: "John",
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe("getEmployee", () => {
    it("should fetch a single employee by id", async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockEmployee });

      const result = await getEmployee("1");

      expect(apiClient.get).toHaveBeenCalledWith("/employees/1");
      expect(result).toEqual(mockEmployee);
    });
  });

  describe("createEmployee", () => {
    it("should create a new employee", async () => {
      const input = {
        firstName: "Jane",
        lastName: "Smith",
        jobTitle: "Designer",
        department: "Design",
        country: "UK",
        salary: 80000,
      };
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockEmployee });

      const result = await createEmployee(input);

      expect(apiClient.post).toHaveBeenCalledWith("/employees", input);
      expect(result).toEqual(mockEmployee);
    });
  });

  describe("updateEmployee", () => {
    it("should update an existing employee", async () => {
      const input = { salary: 120000 };
      const updatedEmployee = { ...mockEmployee, salary: 120000 };
      vi.mocked(apiClient.put).mockResolvedValueOnce({ data: updatedEmployee });

      const result = await updateEmployee("1", input);

      expect(apiClient.put).toHaveBeenCalledWith("/employees/1", input);
      expect(result.salary).toBe(120000);
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee", async () => {
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: undefined });

      await deleteEmployee("1");

      expect(apiClient.delete).toHaveBeenCalledWith("/employees/1");
    });
  });
});

