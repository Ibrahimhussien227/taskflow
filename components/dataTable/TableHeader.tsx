"use client";

import { TableHead, TableRow } from "@/components/ui/table";
import { TableHeaderProps } from "./types";

export function TableHeader<T>({
  columns,
  sortField,
  sortAsc,
  onSort,
}: TableHeaderProps<T>) {
  return (
    <TableRow>
      {columns.map((col) => (
        <TableHead
          key={String(col.key)}
          className={col.key ? "cursor-pointer select-none" : ""}
          onClick={() => {
            if (typeof col.key !== "string") {
              onSort(col.key);
            }
          }}
        >
          {col.label}{" "}
          {sortField === col.key ? (sortAsc ? "↑" : "↓") : ""}
        </TableHead>
      ))}
    </TableRow>
  );
}
