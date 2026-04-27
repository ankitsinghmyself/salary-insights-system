import { apiClient } from "./client";
import {
  type Employee,
  type CreateEmployeeInput,
  type UpdateEmployeeInput,
  type ListEmployeesParams,
  type PaginatedEmployees,
} from "./types";

export async function listEmployees(
  params: ListEmployeesParams = {}
): Promise<PaginatedEmployees> {
  const { data } = await apiClient.get("/employees", { params });
  return data;
}

export async function getEmployee(id: string): Promise<Employee> {
  const { data } = await apiClient.get(`/employees/${id}`);
  return data;
}

export async function createEmployee(
  input: CreateEmployeeInput
): Promise<Employee> {
  const { data } = await apiClient.post("/employees", input);
  return data;
}

export async function updateEmployee(
  id: string,
  input: UpdateEmployeeInput
): Promise<Employee> {
  const { data } = await apiClient.put(`/employees/${id}`, input);
  return data;
}

export async function deleteEmployee(id: string): Promise<void> {
  await apiClient.delete(`/employees/${id}`);
}

