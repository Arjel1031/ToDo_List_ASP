function initInputTask() {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement | null;
    const sampleP = document.getElementById("sample") as HTMLParagraphElement | null;

    if (!taskInput || !sampleP) return; // not on this page

    taskInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const text = taskInput.value.trim();
        sampleP.textContent = text;
        taskInput.value = "";
    });
}
initInputTask() 
