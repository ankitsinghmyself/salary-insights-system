import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { useEmployees, useEmployee, useCreateEmployee } from "./use-employees";
import * as employeesApi from "@/lib/api/employees";
import type { Employee, PaginatedEmployees } from "@/lib/api/types";

vi.mock("@/lib/api/employees", () => ({
  listEmployees: vi.fn(),
  getEmployee: vi.fn(),
  createEmployee: vi.fn(),
  updateEmployee: vi.fn(),
  deleteEmployee: vi.fn(),
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

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useEmployees", () => {
  it("should fetch and return employees", async () => {
    const mockResponse: PaginatedEmployees = {
      data: [mockEmployee],
      total: 1,
    };
    vi.mocked(employeesApi.listEmployees).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useEmployees({ limit: 10 }), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockResponse);
    expect(employeesApi.listEmployees).toHaveBeenCalledWith({ limit: 10 });
  });

  it("should handle loading state", async () => {
    vi.mocked(employeesApi.listEmployees).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useEmployees(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });
});

describe("useEmployee", () => {
  it("should fetch a single employee", async () => {
    vi.mocked(employeesApi.getEmployee).mockResolvedValueOnce(mockEmployee);

    const { result } = renderHook(() => useEmployee("1"), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockEmployee);
    expect(employeesApi.getEmployee).toHaveBeenCalledWith("1");
  });

  it("should not fetch when id is empty", () => {
    vi.mocked(employeesApi.getEmployee).mockResolvedValueOnce(mockEmployee);

    renderHook(() => useEmployee(""), {
      wrapper: Wrapper,
    });

    expect(employeesApi.getEmployee).not.toHaveBeenCalled();
  });
});

describe("useCreateEmployee", () => {
  it("should create employee and invalidate list", async () => {
    const newEmployee = { ...mockEmployee, id: "2" };
    vi.mocked(employeesApi.createEmployee).mockResolvedValueOnce(newEmployee);

    const { result } = renderHook(() => useCreateEmployee(), {
      wrapper: Wrapper,
    });

    result.current.mutate({
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "Designer",
      department: "Design",
      country: "UK",
      salary: 80000,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(employeesApi.createEmployee).toHaveBeenCalled();
    expect(result.current.data).toEqual(newEmployee);
  });
});

