"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProjectInterface } from "@/types/projects/project.type";
import { EditableCellProps } from "./types";

export function EditableCell<T extends keyof ProjectInterface>({
  item,
  field,
  type = "text",
  onChange,
}: EditableCellProps<T>) {
  const inputId = `${field}-${item.id}`;

  if (type === "select") {
    return (
      <div>
        <label htmlFor={inputId} className="sr-only">
          {field}
        </label>
        <Select
          defaultValue={item[field] as string}
          onValueChange={(val) =>
            onChange(val as ProjectInterface[T])
          }
        >
          <SelectTrigger
            id={inputId}
            className="w-[150px]"
            aria-label={`${field} select`}
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (type === "number") {
    return (
      <div>
        <label htmlFor={inputId} className="sr-only">
          {field}
        </label>
        <Input
          id={inputId}
          type="number"
          defaultValue={String(item[field])}
          onBlur={(e) =>
            onChange(Number(e.target.value) as ProjectInterface[T])
          }
          className="w-[100px]"
          aria-label={field}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        {field}
      </label>
      <Input
        id={inputId}
        defaultValue={String(item[field])}
        onBlur={(e) =>
          onChange(e.target.value as ProjectInterface[T])
        }
        aria-label={field}
      />
    </div>
  );
}
