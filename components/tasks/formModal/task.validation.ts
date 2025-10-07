import * as yup from "yup";

export const taskSchema = yup.object({
  name: yup.string().trim().required("Task name is required"),
  status: yup
    .string()
    .oneOf(["Pending", "In Progress", "Completed"])
    .required("Status is required"),
  priority: yup
    .string()
    .oneOf(["Low", "Medium", "High"])
    .required("Priority is required"),
  assignedTo: yup.string().trim().required("Assignee is required"),
});

export type TaskFormData = yup.InferType<typeof taskSchema>;
