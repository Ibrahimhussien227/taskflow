import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjects,
  patchProject,
} from "@/lib/projects/api/projects";
import { ProjectInterface } from "@/types/projects/project.type";

type PatchArgs = { id: string; updates: Partial<ProjectInterface> };

const NUMERIC_FIELDS: ReadonlyArray<keyof ProjectInterface> = [
  "budget",
  "progress",
];

export function useProjects() {
  const queryClient = useQueryClient();

  const query = useQuery<ProjectInterface[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const patchMutation = useMutation({
    mutationFn: async ({ id, updates }: PatchArgs) =>
      patchProject(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previous = queryClient.getQueryData<ProjectInterface[]>([
        "projects",
      ]);

      queryClient.setQueryData<ProjectInterface[]>(
        ["projects"],
        (old) =>
          old?.map((p) => (p.id === id ? { ...p, ...updates } : p)) ??
          []
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["projects"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  // updates a project field — with number parsing for numeric fields
  function handleUpdate<K extends keyof ProjectInterface>(
    id: string,
    field: K,
    value: ProjectInterface[K]
  ): void {
    const updatedValue =
      NUMERIC_FIELDS.includes(field) && typeof value === "string"
        ? (Number(value) as ProjectInterface[K])
        : value;

    patchMutation.mutate({
      id,
      updates: { [field]: updatedValue },
    });
  }

  // chart data from project list
  function getChartData(projects: ProjectInterface[]): {
    name: string;
    value: number;
  }[] {
    const counts = {
      Completed: 0,
      "In Progress": 0,
      Pending: 0,
    };

    for (const project of projects) {
      if (project.status in counts) {
        counts[project.status as keyof typeof counts]++;
      }
    }

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }

  return {
    projects: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    patchMutation,
    handleUpdate,
    getChartData,
  } as const;
}
