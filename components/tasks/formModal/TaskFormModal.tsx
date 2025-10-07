"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useTaskForm } from "@/hooks/tasks/useTaskForm";
import { TaskFormData } from "./task.validation";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: TaskFormData) => void;
  initialData?: Partial<TaskFormData>;
}

export default function TaskFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useTaskForm(initialData, open);

  const status = watch("status");
  const priority = watch("priority");

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data);
    onClose();
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div>
            <Label className="mb-4">Name</Label>
            <Input
              {...register("name")}
              placeholder="Task name"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-4">Status</Label>
            <Select
              value={status}
              onValueChange={(v) =>
                setValue("status", v as TaskFormData["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">
                  In Progress
                </SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-4">Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) =>
                setValue("priority", v as TaskFormData["priority"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-sm text-red-500 mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-4">Assigned To</Label>
            <Input
              {...register("assignedTo")}
              placeholder="e.g. John Doe"
              aria-invalid={!!errors.assignedTo}
            />
            {errors.assignedTo && (
              <p className="text-sm text-red-500 mt-1">
                {errors.assignedTo.message}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? "Save Changes" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
