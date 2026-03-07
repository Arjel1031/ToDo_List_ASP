// Guard — if no token, send back to login immediately
const token = sessionStorage.getItem("token");
if (!token) {
    window.location.href = "/Html/login.html";
}
const logoutButton = document.getElementById("logoutButton");
logoutButton?.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.href = "/Html/login.html";
});
// All API calls now attach the token in the Authorization header
async function api(url, method = "GET", bodyObject = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // 👈 This is the key change
        }
    };
    if (bodyObject !== null) {
        options.body = JSON.stringify(bodyObject);
    }
    const res = await fetch(url, options);
    // If token expired or invalid, kick back to login
    if (res.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/Html/login.html";
        return;
    }
    return await res.json();
}
document.addEventListener("DOMContentLoaded", initTodoPage);
function initTodoPage() {
    const taskInput = document.getElementById("taskInput");
    if (!taskInput)
        return;
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
    const tasks = await api("/api/tasks");
    return tasks;
}
function renderTasks(tasks) {
    const ul = document.getElementById("unorderedList");
    if (!ul)
        return;
    ul.innerHTML = "";
    for (const t of tasks) {
        const li = document.createElement("li");
        li.classList.add("taskList");
        li.textContent = t.taskName;
        li.addEventListener("click", () => {
            onTaskClick(t, li);
        });
        ul.appendChild(li);
    }
}
async function createTask(taskName) {
    await api("/api/tasks", "POST", { taskName });
}
function onTaskClick(task, element) {
    document.querySelectorAll(".taskList").forEach(el => el.classList.remove("active"));
    element.classList.add("active");
    const details = document.getElementById("sample");
    if (!details)
        return;
    details.textContent = task.taskName;
}
export {};
