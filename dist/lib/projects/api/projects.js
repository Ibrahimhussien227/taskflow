"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = getProjects;
exports.patchProject = patchProject;
exports.getProject = getProject;
const configs_1 = require("@/lib/configs");
async function getProjects() {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects`, {
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
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}
async function patchProject(id, updates) {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects/${id}`, {
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
    }
    catch (error) {
        console.error("Error patching project:", error);
        throw error;
    }
}
async function getProject(projectId) {
    try {
        const res = await fetch(`/api/projects/${projectId}`, {
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch projects: ${res.statusText}`);
        }
        return res.json();
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
}
