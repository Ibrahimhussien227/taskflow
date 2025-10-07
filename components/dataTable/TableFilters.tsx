"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TableFiltersProps } from "./types";

export function TableFilters<T>({
  searchField,
  filters,
  onSearch,
  onFilterChange,
}: TableFiltersProps<T>) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {searchField && (
        <Input
          placeholder={`Search by ${String(searchField)}`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
          className="max-w-xs"
        />
      )}

      {filters.map((f) => (
        <select
          key={String(f.key)}
          className="border px-2 py-1 rounded"
          onChange={(e) => onFilterChange(f.key, e.target.value)}
        >
          <option value="">All {String(f.key)}</option>
          {f.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
