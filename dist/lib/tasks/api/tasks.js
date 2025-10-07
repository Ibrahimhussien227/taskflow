"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = getTasks;
exports.createTask = createTask;
exports.patchTask = patchTask;
exports.deleteTaskQuery = deleteTaskQuery;
const configs_1 = require("@/lib/configs");
async function getTasks(projectId) {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects/${projectId}/tasks`, {
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
async function createTask(projectId, task) {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects/${projectId}/tasks`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
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
async function patchTask(projectId, taskId, task) {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects/${projectId}/tasks/${taskId}`, {
            method: "PAtCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
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
async function deleteTaskQuery(projectId, taskId) {
    try {
        const res = await fetch(`${configs_1.API_URL}/projects/${projectId}/tasks/${taskId}`, {
            method: "DELETE",
            credentials: "include",
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
