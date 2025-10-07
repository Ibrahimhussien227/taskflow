"use client";

import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import DashboardCharts from "@/components/projects/ProjectsChart";
import ProjectTable from "@/components/projects/ProjectTable";

export default function DashboardPage() {
  return (
    <div className="space-y-10 p-6">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-72 w-full rounded-lg" />
            <Skeleton className="h-72 w-full rounded-lg" />
          </div>
        }
      >
        <DashboardCharts />
      </Suspense>

      <ProjectTable />
    </div>
  );
}
