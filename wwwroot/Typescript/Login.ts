export { };
const signUpBtn = document.getElementById("signUpButton") as HTMLButtonElement | null;

signUpBtn?.addEventListener("click", () => {
    window.location.href = "/Html/signup.html";
});

const loginBtn = document.getElementById("loginButton") as HTMLButtonElement | null;

loginBtn?.addEventListener("click", async () => {
    const username = (document.getElementById("loginUsername") as HTMLInputElement).value.trim();
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value.trim();

    if (!username || !password) {
        showError("Please enter username and password.");
        return;
    }

    try {
        const response = await fetch("/api/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

        if (!response.ok) {
            showError("Invalid username or password.");
            return;
        }

        const data = await response.json();

        // Store token — this is what gets sent with every API request
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.username);

        window.location.href = "/Html/toDoList.html";
    }
    catch {
        showError("Something went wrong. Try again.");
    }
});

function showError(message: string) {
    const errorDiv = document.getElementById("errorMessage") as HTMLParagraphElement | null;
    if (!errorDiv) return;
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}