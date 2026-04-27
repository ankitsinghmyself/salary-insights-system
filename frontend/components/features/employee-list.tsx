"use client";

import * as React from "react";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import type { Employee } from "@/lib/api/types";

interface EmployeeListProps {
  employees: Employee[];
  total: number;
  isLoading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function EmployeeList({
  employees,
  total,
  isLoading,
  search,
  onSearchChange,
  page,
  pageSize,
  onPageChange,
  onEdit,
  onDelete,
  onAdd,
}: EmployeeListProps) {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Employees</CardTitle>
        <Button onClick={onAdd} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Employee
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {employees.length === 0 ? (
          <EmptyState
            title="No employees found"
            description={search ? "Try a different search term" : "Add your first employee to get started"}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Job Title</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Department</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Country</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Salary</th>
                    <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium">{emp.fullName}</td>
                      <td className="py-3 px-2 text-gray-600">{emp.jobTitle}</td>
                      <td className="py-3 px-2 text-gray-600">{emp.department}</td>
                      <td className="py-3 px-2 text-gray-600">{emp.country}</td>
                      <td className="py-3 px-2 text-right font-medium">
                        ${emp.salary.toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(emp)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(emp.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing {startItem} to {endItem} of {total} employees
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

