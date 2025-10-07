"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChartSkeleton() {
  return (
    <div className="h-72 w-full rounded-lg border p-4">
      <Skeleton className="h-full w-full rounded-lg" />
    </div>
  );
}
