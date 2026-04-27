import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SalaryDashboard } from "./salary-dashboard";

describe("SalaryDashboard", () => {
  it("renders loading state", () => {
    render(<SalaryDashboard isLoading={true} />);
    expect(screen.getAllByRole("generic", { name: "" }).length).toBeGreaterThan(0);
  });

  it("renders stats correctly", () => {
    const stats = {
      min: 30000,
      max: 200000,
      avg: 95000,
      total: 100,
    };
    render(<SalaryDashboard stats={stats} isLoading={false} />);

    // Use locale-aware formatting to match component output
    const avgFormatted = `$${Math.round(stats.avg).toLocaleString()}`;
    const minFormatted = `$${stats.min.toLocaleString()}`;
    const maxFormatted = `$${stats.max.toLocaleString()}`;
    const totalFormatted = stats.total.toLocaleString();

    expect(screen.getByText(avgFormatted)).toBeInTheDocument();
    expect(screen.getByText(minFormatted)).toBeInTheDocument();
    expect(screen.getByText(maxFormatted)).toBeInTheDocument();
    expect(screen.getByText(totalFormatted)).toBeInTheDocument();
  });

  it("renders all stat labels", () => {
    const stats = {
      min: 30000,
      max: 200000,
      avg: 95000,
      total: 100,
    };
    render(<SalaryDashboard stats={stats} isLoading={false} />);

    expect(screen.getByText("Average Salary")).toBeInTheDocument();
    expect(screen.getByText("Minimum Salary")).toBeInTheDocument();
    expect(screen.getByText("Maximum Salary")).toBeInTheDocument();
    expect(screen.getByText("Total Employees")).toBeInTheDocument();
  });
});
