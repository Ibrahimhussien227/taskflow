"use client";

import { useCallback, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import TaskFormModal from "@/components/tasks/formModal/TaskFormModal";
import { TaskFormData } from "@/components/tasks/formModal/task.validation";
import TaskTable from "@/components/tasks/taskTable/TaskTable";
import { useTasks } from "@/hooks/tasks/useTasks";
import { useProject } from "@/hooks/projects/useProject";
import { Task } from "@/types/tasks/tasks.type";

export default function ProjectDetailsPage() {
  const { id: projectId } = useParams<{ id: string }>();
  const { project, isLoading, isError } = useProject(projectId);
  const { addTask, editTask } = useTasks(projectId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAdd = useCallback(() => {
    setEditingTask(null);
    setDialogOpen(true);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  }, []);

  const handleSubmit = useCallback(
    (data: TaskFormData) => {
      if (editingTask) {
        editTask.mutate({ ...data, id: editingTask.id });
      } else {
        addTask.mutate({ ...data, projectId });
      }
      setDialogOpen(false);
      setEditingTask(null);
    },
    [editingTask, addTask, editTask, projectId]
  );
  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="p-6">
        <p className="text-red-500">
          Failed to load project details. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">
          {project.name}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <p>
            <strong>Budget:</strong> $
            {project.budget.toLocaleString()}
          </p>
          <p>
            <strong>Progress:</strong> {project.progress}%
          </p>
          <p>
            <strong>Start:</strong>{" "}
            {new Date(project.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {new Date(project.endDate).toLocaleDateString()}
          </p>
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={handleAdd}>+ Add Task</Button>
      </div>

      <TaskTable projectId={projectId} onEdit={handleEdit} />

      <TaskFormModal
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        initialData={
          editingTask
            ? {
                name: editingTask.name,
                status: editingTask.status,
                priority: editingTask.priority,
                assignedTo: editingTask.assignedTo ?? "",
              }
            : undefined
        }
      />
    </div>
  );
}
