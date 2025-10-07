"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTableProps } from "./types";
import { TableHeader } from "./TableHeader";
import { TableFilters } from "./TableFilters";
import { TablePagination } from "./TablePagination";

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchField,
  filters = [],
  pageSize = 5,
  tableTitle = "Data Table",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<
    Record<string, string>
  >({});
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  // Filter
  let filtered = data.filter((item) => {
    let matchesSearch = true;
    let matchesFilters = true;

    if (searchField) {
      const fieldValue = String(
        item[searchField] ?? ""
      ).toLowerCase();
      matchesSearch = fieldValue.includes(search.toLowerCase());
    }

    for (const [key, value] of Object.entries(filterValues)) {
      if (value && String(item[key as keyof T]) !== value) {
        matchesFilters = false;
      }
    }

    return matchesSearch && matchesFilters;
  });

  // Sort
  if (sortField) {
    filtered = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleSort = (field: keyof T) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tableTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <TableFilters
          searchField={searchField}
          filters={filters}
          onSearch={setSearch}
          onFilterChange={(key, value) =>
            setFilterValues((prev) => ({
              ...prev,
              [String(key)]: value,
            }))
          }
        />

        {/* Table */}
        <Table>
          <thead>
            <TableHeader
              columns={columns}
              sortField={sortField}
              sortAsc={sortAsc}
              onSort={handleSort}
            />
          </thead>
          <TableBody>
            {paginated.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render
                      ? col.render(item)
                      : String(item[col.key as keyof T] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </CardContent>
    </Card>
  );
}
