"use client";

import { useJobTitleAverages } from "@/hooks/use-salary-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

export function JobTitleStats() {
  const { data: jobTitles, isLoading } = useJobTitleAverages();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-600" />
          Average Salary by Job Title
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : jobTitles && jobTitles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-medium text-gray-500">Job Title</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-500">Avg Salary</th>
                  <th className="text-right py-2 px-2 font-medium text-gray-500">Employees</th>
                </tr>
              </thead>
              <tbody>
                {jobTitles.map((jt) => (
                  <tr key={jt.jobTitle} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{jt.jobTitle}</td>
                    <td className="py-3 px-2 text-right">
                      ${Math.round(jt.average).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right text-gray-500">
                      {jt.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}

