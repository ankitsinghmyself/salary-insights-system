import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./client";
import {
  getOverallStats,
  getSalaryStatsByCountry,
  getAverageSalaryByJobTitle,
  getAverageSalaryByRoleInCountry,
  getTopEarners,
} from "./salary";

vi.mock("./client", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("salary API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getOverallStats", () => {
    it("should fetch overall salary stats", async () => {
      const mockStats = { min: 30000, max: 200000, avg: 95000, total: 100 };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockStats });

      const result = await getOverallStats();

      expect(apiClient.get).toHaveBeenCalledWith("/salary/overall-stats");
      expect(result).toEqual(mockStats);
    });
  });

  describe("getSalaryStatsByCountry", () => {
    it("should fetch salary stats for a country", async () => {
      const mockStats = { min: 40000, max: 150000, avg: 85000, total: 50 };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockStats });

      const result = await getSalaryStatsByCountry("USA");

      expect(apiClient.get).toHaveBeenCalledWith("/salary/stats/USA");
      expect(result).toEqual(mockStats);
    });
  });

  describe("getAverageSalaryByJobTitle", () => {
    it("should fetch average salary by job title", async () => {
      const mockData = [
        { jobTitle: "Engineer", average: 100000, count: 20 },
        { jobTitle: "Designer", average: 80000, count: 10 },
      ];
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await getAverageSalaryByJobTitle();

      expect(apiClient.get).toHaveBeenCalledWith("/salary/by-jobtitle");
      expect(result).toEqual(mockData);
    });
  });

  describe("getAverageSalaryByRoleInCountry", () => {
    it("should fetch average salary for role in country", async () => {
      const mockData = { average: 95000 };
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await getAverageSalaryByRoleInCountry("USA", "Engineer");

      expect(apiClient.get).toHaveBeenCalledWith(
        "/salary/average/USA/Engineer"
      );
      expect(result).toEqual(mockData);
    });
  });

  describe("getTopEarners", () => {
    it("should fetch top earners globally", async () => {
      const mockData = [
        { id: "1", fullName: "John Doe", jobTitle: "CEO", country: "USA", salary: 250000 },
      ];
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await getTopEarners();

      expect(apiClient.get).toHaveBeenCalledWith("/salary/top-earners", {
        params: { country: undefined, limit: 10 },
      });
      expect(result).toEqual(mockData);
    });

    it("should fetch top earners by country with custom limit", async () => {
      const mockData = [
        { id: "2", fullName: "Jane Smith", jobTitle: "CTO", country: "UK", salary: 220000 },
      ];
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockData });

      const result = await getTopEarners("UK", 5);

      expect(apiClient.get).toHaveBeenCalledWith("/salary/top-earners", {
        params: { country: "UK", limit: 5 },
      });
      expect(result).toEqual(mockData);
    });
  });
});

