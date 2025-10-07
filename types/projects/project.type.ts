export type ProjectStatus = "Pending" | "In Progress" | "Completed";

export interface ProjectInterface {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
}
