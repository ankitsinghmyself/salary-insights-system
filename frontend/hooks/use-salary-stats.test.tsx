import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { useOverallStats, useCountryStats, useJobTitleAverages, useTopEarners } from "./use-salary-stats";
import * as salaryApi from "@/lib/api/salary";

vi.mock("@/lib/api/salary", () => ({
  getOverallStats: vi.fn(),
  getSalaryStatsByCountry: vi.fn(),
  getAverageSalaryByJobTitle: vi.fn(),
  getTopEarners: vi.fn(),
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useOverallStats", () => {
  it("should fetch overall salary stats", async () => {
    const mockStats = { min: 30000, max: 200000, avg: 95000, total: 100 };
    vi.mocked(salaryApi.getOverallStats).mockResolvedValueOnce(mockStats);

    const { result } = renderHook(() => useOverallStats(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockStats);
    expect(salaryApi.getOverallStats).toHaveBeenCalled();
  });
});

describe("useCountryStats", () => {
  it("should fetch stats for a country", async () => {
    const mockStats = { min: 40000, max: 150000, avg: 85000, total: 50 };
    vi.mocked(salaryApi.getSalaryStatsByCountry).mockResolvedValueOnce(mockStats);

    const { result } = renderHook(() => useCountryStats("USA"), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockStats);
    expect(salaryApi.getSalaryStatsByCountry).toHaveBeenCalledWith("USA");
  });

  it("should not fetch when country is empty", () => {
    vi.mocked(salaryApi.getSalaryStatsByCountry).mockResolvedValueOnce({} as any);

    renderHook(() => useCountryStats(""), {
      wrapper: Wrapper,
    });

    expect(salaryApi.getSalaryStatsByCountry).not.toHaveBeenCalled();
  });
});

describe("useJobTitleAverages", () => {
  it("should fetch job title averages", async () => {
    const mockData = [
      { jobTitle: "Engineer", average: 100000, count: 20 },
    ];
    vi.mocked(salaryApi.getAverageSalaryByJobTitle).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useJobTitleAverages(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
  });
});

describe("useTopEarners", () => {
  it("should fetch top earners with params", async () => {
    const mockData = [
      { id: "1", fullName: "John Doe", jobTitle: "CEO", country: "USA", salary: 250000 },
    ];
    vi.mocked(salaryApi.getTopEarners).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useTopEarners("USA", 5), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(salaryApi.getTopEarners).toHaveBeenCalledWith("USA", 5);
  });
});
