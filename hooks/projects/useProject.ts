"use client";

import { useQuery } from "@tanstack/react-query";

import { getProject } from "@/lib/projects/api/projects";
import { ProjectInterface } from "@/types/projects/project.type";

export function useProject(projectId?: string) {
  const query = useQuery<ProjectInterface>({
    queryKey: ["project", projectId ?? ""],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      return getProject(id as string);
    },
    staleTime: 1000 * 60 * 2, // 2 mins
    refetchOnWindowFocus: false,
  });

  return {
    project: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  } as const;
}
