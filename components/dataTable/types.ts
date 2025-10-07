import { ProjectInterface } from "@/types/projects/project.type";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchField?: keyof T;
  filters?: {
    key: keyof T;
    options: string[];
  }[];
  pageSize?: number;
  tableTitle?: string;
}

export type EditableCellProps<T extends keyof ProjectInterface> = {
  item: ProjectInterface;
  field: T;
  type?: "text" | "number" | "select";
  onChange: (value: ProjectInterface[T]) => void;
};

export interface TableFiltersProps<T> {
  searchField?: keyof T;
  filters: { key: keyof T; options: string[] }[];
  onSearch: (value: string) => void;
  onFilterChange: (key: keyof T, value: string) => void;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortField: keyof T | null;
  sortAsc: boolean;
  onSort: (field: keyof T) => void;
}

export interface TablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
