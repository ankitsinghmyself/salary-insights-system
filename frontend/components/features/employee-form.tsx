"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Employee, CreateEmployeeInput } from "@/lib/api/types";

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  country: z.string().min(1, "Country is required"),
  salary: z.number().min(1, "Salary must be greater than 0"),
  experienceYears: z.number().min(0),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: Employee | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateEmployeeInput) => void;
  isSubmitting?: boolean;
}

export function EmployeeForm({
  employee,
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EmployeeFormProps) {
  const isEditing = !!employee;

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      department: "",
      country: "",
      salary: 0,
      experienceYears: 0,
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  React.useEffect(() => {
    if (open) {
      reset({
        firstName: employee?.firstName || "",
        lastName: employee?.lastName || "",
        jobTitle: employee?.jobTitle || "",
        department: employee?.department || "",
        country: employee?.country || "",
        salary: employee?.salary || 0,
        experienceYears: employee?.experienceYears || 0,
      });
    }
  }, [open, employee, reset]);

  const handleFormSubmit = handleSubmit((data: EmployeeFormData) => {
    onSubmit(data as CreateEmployeeInput);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
          <Input
            label="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <Input
            label="Job Title"
            {...register("jobTitle")}
            error={errors.jobTitle?.message}
          />
          <Input
            label="Department"
            {...register("department")}
            error={errors.department?.message}
          />
          <Input
            label="Country"
            {...register("country")}
            error={errors.country?.message}
          />
          <Input
            label="Salary (USD)"
            type="number"
            {...register("salary", { valueAsNumber: true })}
            error={errors.salary?.message}
          />
          <Input
            label="Years of Experience"
            type="number"
            {...register("experienceYears", { valueAsNumber: true })}
            error={errors.experienceYears?.message}
          />
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

