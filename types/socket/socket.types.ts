import { Task } from "../tasks/tasks.type";

export interface ServerToClientEvents {
  "task:add": (task: Task) => void;
  "task:update": (task: Task) => void;
  "task:delete": (id: string) => void;
}

export interface ClientToServerEvents {
  "task:add": (task: Task) => void;
  "task:update": (task: Task) => void;
  "task:delete": (id: string) => void;
}
