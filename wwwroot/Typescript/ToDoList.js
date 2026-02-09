"use strict";
const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", () => {
    window.location.href = "/Html/Login.html";
});
async function api(url, method = "GET", bodyObject = null) {
    const options = { method };
    if (bodyObject !== null) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(bodyObject);
    }
    const res = await fetch(url, options);
    if (!res.ok) {
    }
    return await res.json();
}
document.addEventListener("DOMContentLoaded", initTodoPage);
function initTodoPage() {
    const taskInput = document.getElementById("taskInput");
    if (!taskInput)
        return;
    // Load tasks when page opens
    loadAndRender().catch(console.error);
    taskInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter")
            return;
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text)
            return;
        (async () => {
            await createTask(text);
            taskInput.value = "";
            await loadAndRender();
        })().catch(console.error);
    });
}
async function loadAndRender() {
    const tasks = await getTasks();
    renderTasks(tasks);
}
async function getTasks() {
    const tasks = await api("/api/tasks"); // GET
    return tasks;
}
function renderTasks(tasks) {
    const ul = document.getElementById("unorderedList");
    if (!ul)
        return;
    ul.innerHTML = "";
    for (const t of tasks) {
        const li = document.createElement("li");
        li.textContent = t.taskName;
        ul.appendChild(li);
    }
}
async function createTask(taskName) {
    const task = await api("/api/tasks", "POST", { taskName });
}
