import { apiClient } from "./client";
import {
  type SalaryStats,
  type JobTitleAverage,
  type TopEarner,
} from "./types";

export async function getOverallStats(): Promise<SalaryStats> {
  const { data } = await apiClient.get("/salary/overall-stats");
  return data;
}

export async function getSalaryStatsByCountry(
  country: string
): Promise<SalaryStats> {
  const { data } = await apiClient.get(`/salary/stats/${country}`);
  return data;
}

export async function getAverageSalaryByJobTitle(): Promise<JobTitleAverage[]> {
  const { data } = await apiClient.get("/salary/by-jobtitle");
  return data;
}

export async function getAverageSalaryByRoleInCountry(
  country: string,
  jobTitle: string
): Promise<{ average: number }> {
  const { data } = await apiClient.get(`/salary/average/${country}/${jobTitle}`);
  return data;
}

export async function getTopEarners(
  country?: string,
  limit: number = 10
): Promise<TopEarner[]> {
  const { data } = await apiClient.get("/salary/top-earners", {
    params: { country, limit },
  });
  return data;
}

