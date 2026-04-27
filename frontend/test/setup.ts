import "@testing-library/jest-dom";

// Mock fetch globally for API tests
 globalThis.fetch = vi.fn();
 
 // Clean up after each test
 import { cleanup } from "@testing-library/react";
 import { afterEach } from "vitest";
 
 afterEach(() => {
   cleanup();
 });
