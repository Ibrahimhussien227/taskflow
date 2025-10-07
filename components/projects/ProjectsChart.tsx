"use client";

import { Suspense, useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChartSkeleton from "@/components/projects/charts/ChartSkeleton";
import ProjectsPieChart from "@/components/projects/charts/ProjectsPieChart";
import ProjectsBarChart from "@/components/projects/charts/ProjectsBarChart";
import { ProjectInterface } from "@/types/projects/project.type";
import { useProjects } from "@/hooks/projects/useProjects";

export default function DashboardCharts() {
  const { projects, isLoading, isError, getChartData } =
    useProjects();

  const chartData = useMemo(
    () => getChartData(projects),
    [projects, getChartData]
  );

  if (isLoading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-red-500">Failed to load projects</div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Projects by Status</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Suspense fallback={<ChartSkeleton />}>
            <ProjectsPieChart chartData={chartData} />
          </Suspense>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <Suspense fallback={<ChartSkeleton />}>
            <ProjectsBarChart
              projects={projects as ProjectInterface[]}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
