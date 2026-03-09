export { };
// Guard — if no token, send back to login immediately
const token = sessionStorage.getItem("token");
if (!token) {
    window.location.href = "/Html/login.html";
}

const logoutButton = document.getElementById("logoutButton") as HTMLButtonElement | null;

logoutButton?.addEventListener("click", () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    window.location.href = "/Html/login.html";
});
// All API calls now attach the token in the Authorization header
async function api(url: string, method: string = "GET", bodyObject: any = null) {
    const options: RequestInit =
    {
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

type Task = {
    id: number;
    taskName: string;
};

document.addEventListener("DOMContentLoaded", initTodoPage);

function initTodoPage() {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;
    if (!taskInput) return;

    loadAndRender().catch(console.error);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        e.preventDefault();

        const text = taskInput.value.trim();
        if (!text) return;

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

async function getTasks(): Promise<Task[]> {
    const tasks = await api("/api/tasks");
    return tasks as Task[];
}

function renderTasks(tasks: Task[]) {
    const ul = document.getElementById("unorderedList") as HTMLUListElement | null;
    if (!ul) return;

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

async function createTask(taskName: string) {
    await api("/api/tasks", "POST", { taskName });
}

function onTaskClick(task: Task, element: HTMLLIElement) {
    document.querySelectorAll(".taskList").forEach(el => el.classList.remove("active"));
    element.classList.add("active");

    const details = document.getElementById("sample") as HTMLParagraphElement | null;
    if (!details) return;
    details.textContent = task.taskName;
}