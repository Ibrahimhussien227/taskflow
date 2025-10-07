import { API_URL } from "@/lib/configs";
import { ProjectInterface } from "@/types/projects/project.type";

export async function getProjects(): Promise<ProjectInterface[]> {
  try {
    const res = await fetch(`${API_URL}/projects`, {
      method: "GET",
      credentials: "include", // so cookies are sent
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function patchProject(
  id: string,
  updates: Partial<ProjectInterface>
): Promise<ProjectInterface> {
  try {
    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`Failed to patch project: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error patching project:", error);
    throw error;
  }
}

export async function getProject(
  projectId: string
): Promise<ProjectInterface> {
  try {
    const res = await fetch(`/api/projects/${projectId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}
