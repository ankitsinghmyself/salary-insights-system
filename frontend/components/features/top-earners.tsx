"use client";

import { useTopEarners } from "@/hooks/use-salary-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy } from "lucide-react";

interface TopEarnersProps {
  country?: string;
}

export function TopEarners({ country }: TopEarnersProps = {}) {
  const { data: earners, isLoading } = useTopEarners(country, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Earners{country ? ` in ${country}` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : earners && earners.length > 0 ? (
          <div className="space-y-3">
            {earners.map((earner, index) => (
              <div
                key={earner.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                        ? "bg-gray-100 text-gray-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-50 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{earner.fullName}</p>
                    <p className="text-sm text-gray-500">
                      {earner.jobTitle} · {earner.country}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">
                  ${earner.salary.toLocaleString()}
                </p>
              </div>
            ))}
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

