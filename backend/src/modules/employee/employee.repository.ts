import { Employee } from "./employee.types";

// internal store (now hidden here)
const employeeStore = new Map<string, Employee>();

let currentId = 1;

export const employeeRepository = {
  create(data: Omit<Employee, "id">): Employee {
    const employee: Employee = {
      id: String(currentId++),
      ...data,
    };

    employeeStore.set(employee.id, employee);
    return employee;
  },

  findById(id: string): Employee | null {
    return employeeStore.get(id) || null;
  },

  update(id: string, updated: Employee): Employee | null {
    if (!employeeStore.has(id)) return null;

    employeeStore.set(id, updated);
    return updated;
  },

  delete(id: string): boolean {
    if (!employeeStore.has(id)) return false;

    employeeStore.delete(id);
    return true;
  },

  findAll(): Employee[] {
    return Array.from(employeeStore.values());
  },

  clear() {
    employeeStore.clear();
  },
};