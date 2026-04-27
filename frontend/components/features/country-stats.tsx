"use client";

import * as React from "react";
import { useCountryStats } from "@/hooks/use-salary-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe } from "lucide-react";

export function CountryStats() {
  const [country, setCountry] = React.useState("");
  const [searchCountry, setSearchCountry] = React.useState("");
  const { data: stats, isLoading } = useCountryStats(searchCountry);

  const handleSearch = () => {
    setSearchCountry(country.trim());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          Salary by Country
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter country (e.g., USA)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} size="sm">
            Search
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : stats && searchCountry ? (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Min</p>
              <p className="text-lg font-bold text-gray-900">
                ${stats.min.toLocaleString()}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Avg</p>
              <p className="text-lg font-bold text-gray-900">
                ${Math.round(stats.avg).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Max</p>
              <p className="text-lg font-bold text-gray-900">
                ${stats.max.toLocaleString()}
              </p>
            </div>
          </div>
        ) : searchCountry ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No data found for this country
          </p>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            Enter a country to see salary statistics
          </p>
        )}
      </CardContent>
    </Card>
  );
}

