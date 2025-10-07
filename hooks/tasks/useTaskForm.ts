// /hooks/useTaskForm.ts
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  TaskFormData,
  taskSchema,
} from "@/components/tasks/formModal/task.validation";

export function useTaskForm(
  initialData?: Partial<TaskFormData>,
  open?: boolean
) {
  const form = useForm<TaskFormData>({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      name: "",
      status: "Pending",
      priority: "Medium",
      assignedTo: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (open) {
      reset({
        name: initialData?.name || "",
        status: initialData?.status || "Pending",
        priority: initialData?.priority || "Medium",
        assignedTo: initialData?.assignedTo || "",
      });
    }
  }, [initialData, open, reset]);

  return form;
}
