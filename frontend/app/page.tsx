"use client";

import { SalaryDashboard } from "@/components/features/salary-dashboard";
import { CountryStats } from "@/components/features/country-stats";
import { TopEarners } from "@/components/features/top-earners";
import { JobTitleStats } from "@/components/features/job-title-stats";
import { useOverallStats } from "@/hooks/use-salary-stats";

export default function DashboardPage() {
  const { data: stats, isLoading } = useOverallStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of salary insights across your organization
        </p>
      </div>

      <SalaryDashboard stats={stats} isLoading={isLoading} />

      <div className="grid gap-6 lg:grid-cols-2">
        <CountryStats />
        <TopEarners />
      </div>

      <JobTitleStats />
    </div>
  );
}

