"use strict";
function initInputTask() {
    const taskInput = document.getElementById("taskInput");
    const sampleP = document.getElementById("sample");
    if (!taskInput || !sampleP)
        return; // not on this page
    taskInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter")
            return;
        const text = taskInput.value.trim();
        sampleP.textContent = text;
        taskInput.value = "";
    });
}
initInputTask();
