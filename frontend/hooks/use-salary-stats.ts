import { useQuery } from "@tanstack/react-query";
import {
  getOverallStats,
  getSalaryStatsByCountry,
  getAverageSalaryByJobTitle,
  getTopEarners,
} from "@/lib/api/salary";

export const salaryKeys = {
  all: ["salary"] as const,
  overall: () => [...salaryKeys.all, "overall"] as const,
  byCountry: (country: string) => [...salaryKeys.all, "country", country] as const,
  byJobTitle: () => [...salaryKeys.all, "jobTitle"] as const,
  topEarners: (country?: string, limit?: number) =>
    [...salaryKeys.all, "topEarners", country, limit] as const,
};

export function useOverallStats() {
  return useQuery({
    queryKey: salaryKeys.overall(),
    queryFn: getOverallStats,
  });
}

export function useCountryStats(country: string) {
  return useQuery({
    queryKey: salaryKeys.byCountry(country),
    queryFn: () => getSalaryStatsByCountry(country),
    enabled: !!country,
  });
}

export function useJobTitleAverages() {
  return useQuery({
    queryKey: salaryKeys.byJobTitle(),
    queryFn: getAverageSalaryByJobTitle,
  });
}

export function useTopEarners(country?: string, limit: number = 10) {
  return useQuery({
    queryKey: salaryKeys.topEarners(country, limit),
    queryFn: () => getTopEarners(country, limit),
  });
}

