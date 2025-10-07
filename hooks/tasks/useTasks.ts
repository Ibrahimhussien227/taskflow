"use client";

import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Task } from "@/types/tasks/tasks.type";
import {
  createTask,
  deleteTaskQuery,
  getTasks,
  patchTask,
} from "@/lib/tasks/api/tasks";
import { getSocket } from "@/lib/socket/client";

export function useTasks(projectId: string) {
  const queryClient = useQueryClient();
  const socket = getSocket();

  // ✅ Fetch tasks
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ["tasks", projectId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      return getTasks(id as string);
    },
    enabled: Boolean(projectId),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const addTask = useMutation({
    mutationFn: (task: Partial<Task>) => createTask(projectId, task),
    onSuccess: (newTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old ? [...old, newTask] : [newTask]
      );
      socket.emit("task:created", newTask);
    },
  });

  const editTask = useMutation({
    mutationFn: (task: Partial<Task> & { id: string }) =>
      patchTask(projectId, task.id, task),
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old
          ? old.map((t) =>
              t.id === updatedTask.id ? updatedTask : t
            )
          : [updatedTask]
      );
      socket.emit("task:updated", updatedTask);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id: string) => deleteTaskQuery(projectId, id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old ? old.filter((t) => t.id !== id) : []
      );
      socket.emit("task:deleted", id);
    },
  });

  useEffect(() => {
    socket.on("task:created", (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old ? [...old, task] : [task]
      );
    });

    socket.on("task:updated", (task: Task) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old ? old.map((t) => (t.id === task.id ? task : t)) : [task]
      );
    });

    socket.on("task:deleted", (taskId: string) => {
      queryClient.setQueryData<Task[]>(["tasks", projectId], (old) =>
        old ? old.filter((t) => t.id !== taskId) : []
      );
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [socket, projectId, queryClient]);
  return { tasks, addTask, editTask, deleteTask, isLoading } as const;
}
