"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/dataTable/DataTable";
import { EditableCell } from "@/components/dataTable/EditableCell";
import { formatDate } from "@/utils/formatDate";
import { ProjectInterface } from "@/types/projects/project.type";
import { useProjects } from "@/hooks/projects/useProjects";
import { Button } from "../ui/button";

export default function ProjectTable() {
  const router = useRouter();
  const { projects, isLoading, handleUpdate } = useProjects();

  const makeEditableColumn = <K extends keyof ProjectInterface>(
    field: K,
    label: string,
    type: "text" | "number" | "select"
  ) => ({
    key: field,
    label,
    render: (p: ProjectInterface) => (
      <EditableCell
        item={p}
        field={field}
        type={type}
        onChange={(val) => handleUpdate(p.id, field, val)}
      />
    ),
  });

  const makeDateColumn = (
    field: keyof ProjectInterface,
    label: string
  ) => ({
    key: field,
    label,
    render: (p: ProjectInterface) => (
      <span>{formatDate(p[field])}</span>
    ),
  });

  if (isLoading)
    return <div className="animate-pulse h-32 bg-gray-200 rounded" />;

  return (
    <DataTable
      data={projects}
      columns={[
        {
          key: "name",
          label: "Name",
          render: (p: ProjectInterface) => (
            <Button
              onClick={() => router.push(`/dashboard/${p.id}`)}
              className="bg-white text-black hover:underline hover:bg-white"
            >
              {p.name}
            </Button>
          ),
        },
        makeEditableColumn("status", "Status", "select"),
        makeDateColumn("startDate", "Start Date"),
        makeDateColumn("endDate", "End Date"),
        makeEditableColumn("progress", "Progress", "number"),
        makeEditableColumn("budget", "Budget", "number"),
      ]}
      searchField="name"
      filters={[
        {
          key: "status",
          options: ["Pending", "In Progress", "Completed"],
        },
      ]}
      pageSize={10}
      tableTitle="All Projects"
    />
  );
}
