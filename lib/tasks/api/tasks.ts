import { API_URL } from "@/lib/configs";
import { Task } from "@/types/tasks/tasks.type";

export async function getTasks(projectId: string): Promise<Task[]> {
  try {
    const res = await fetch(
      `${API_URL}/projects/${projectId}/tasks`,
      {
        method: "GET",
        credentials: "include", // so cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function createTask(
  projectId: string,
  task: Partial<Task>
): Promise<Task> {
  try {
    const res = await fetch(
      `${API_URL}/projects/${projectId}/tasks`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to patch project: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error patching project:", error);
    throw error;
  }
}

export async function patchTask(
  projectId: string,
  taskId: string,
  task: Partial<Task>
): Promise<Task> {
  try {
    const res = await fetch(
      `${API_URL}/projects/${projectId}/tasks/${taskId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to patch project: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error patching project:", error);
    throw error;
  }
}

export async function deleteTaskQuery(
  projectId: string,
  taskId: string
): Promise<Task> {
  try {
    const res = await fetch(
      `${API_URL}/projects/${projectId}/tasks/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to patch project: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error patching project:", error);
    throw error;
  }
}
