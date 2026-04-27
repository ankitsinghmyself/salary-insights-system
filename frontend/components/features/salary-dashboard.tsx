"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, TrendingDown, Users } from "lucide-react";
import type { SalaryStats } from "@/lib/api/types";

interface SalaryDashboardProps {
  stats?: SalaryStats;
  isLoading: boolean;
}

export function SalaryDashboard({ stats, isLoading }: SalaryDashboardProps) {
  const items = [
    {
      title: "Average Salary",
      value: stats ? `$${Math.round(stats.avg).toLocaleString()}` : "-",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Minimum Salary",
      value: stats ? `$${stats.min.toLocaleString()}` : "-",
      icon: TrendingDown,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Maximum Salary",
      value: stats ? `$${stats.max.toLocaleString()}` : "-",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Employees",
      value: stats ? stats.total.toLocaleString() : "-",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {item.title}
            </CardTitle>
            <div className={`${item.bgColor} p-2 rounded-lg`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

