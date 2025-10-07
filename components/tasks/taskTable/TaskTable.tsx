"use client";

import { Loader2 } from "lucide-react";

import { DataTable } from "@/components/dataTable/DataTable";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/tasks/useTasks";
import { Task } from "@/types/tasks/tasks.type";

interface TaskTableProps {
  projectId: string;
  onEdit: (task: Task) => void;
}

export default function TaskTable({
  projectId,
  onEdit,
}: TaskTableProps) {
  const { tasks, isLoading, deleteTask } = useTasks(projectId);

  const handleDelete = (taskId: string, taskName: string) => {
    if (
      confirm(
        `Are you sure you want to delete "${taskName}"? This action cannot be undone.`
      )
    ) {
      deleteTask.mutate(taskId, {
        onError: (error) => {
          console.error("Failed to delete task:", error);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse h-32 bg-gray-200 rounded">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks found for this project.</p>
      </div>
    );
  }

  return (
    <DataTable
      data={tasks}
      columns={[
        { key: "name", label: "Name" },
        { key: "status", label: "Status" },
        { key: "priority", label: "Priority" },
        { key: "assignedTo", label: "Assigned To" },
        {
          key: "actions",
          label: "Actions",
          render: (t: Task) => (
            <div className="flex gap-2">
              <Button
                key={`edit-${t.id}`}
                size="sm"
                variant="outline"
                onClick={() => onEdit(t)}
              >
                Edit
              </Button>
              <Button
                key={`delete-${t.id}`}
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(t.id, t.name)}
                disabled={deleteTask.isPending}
              >
                {deleteTask.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          ),
        },
      ]}
      searchField="name"
      filters={[
        {
          key: "status",
          options: ["Pending", "In Progress", "Completed"],
        },
      ]}
      pageSize={5}
      tableTitle="Project Tasks"
    />
  );
}
