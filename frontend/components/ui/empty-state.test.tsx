import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders default title and description", () => {
    render(<EmptyState />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search or filters.")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(<EmptyState title="Custom Title" description="Custom description" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});

