"use client";

import * as React from "react";
import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from "@/hooks/use-employees";
import { EmployeeList } from "@/components/features/employee-list";
import { EmployeeForm } from "@/components/features/employee-form";
import type { Employee, CreateEmployeeInput } from "@/lib/api/types";

const PAGE_SIZE = 10;

export default function EmployeesPage() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null);

  const { data, isLoading } = useEmployees({
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    search: search || undefined,
  });

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const handleAdd = () => {
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (data: CreateEmployeeInput) => {
    if (editingEmployee) {
      updateMutation.mutate(
        { id: editingEmployee.id, data },
        {
          onSuccess: () => {
            setFormOpen(false);
            setEditingEmployee(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <p className="text-gray-500 mt-1">
          Manage your organization's employees
        </p>
      </div>

      <EmployeeList
        employees={data?.data || []}
        total={data?.total || 0}
        isLoading={isLoading}
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      <EmployeeForm
        employee={editingEmployee}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

