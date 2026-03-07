const registerBtn = document.getElementById("signUpSubmit");
registerBtn?.addEventListener("click", async () => {
    const email = document.getElementById("signUpEmail").value.trim();
    const username = document.getElementById("signUpUsername").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();
    const confirmPassword = document.getElementById("signUpConfirmPassword").value.trim();
    // Client-side validation first
    if (!email || !username || !password || !confirmPassword) {
        showError("All fields are required.");
        return;
    }
    if (password !== confirmPassword) {
        showError("Passwords do not match.");
        return;
    }
    if (password.length < 6) {
        showError("Password must be at least 6 characters.");
        return;
    }
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password })
        });
        if (!response.ok) {
            const errorText = await response.text();
            showError(errorText);
            return;
        }
        const data = await response.json();
        // Auto login after successful registration
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("username", data.username);
        showSuccess("Account created! Redirecting...");
        setTimeout(() => {
            window.location.href = "/Html/toDoList.html";
        }, 1000);
    }
    catch {
        showError("Something went wrong. Try again.");
    }
});
function showError(message) {
    const errorDiv = document.getElementById("errorMessage");
    const successDiv = document.getElementById("successMessage");
    if (!errorDiv)
        return;
    if (successDiv)
        successDiv.style.display = "none";
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}
function showSuccess(message) {
    const successDiv = document.getElementById("successMessage");
    const errorDiv = document.getElementById("errorMessage");
    if (!successDiv)
        return;
    if (errorDiv)
        errorDiv.style.display = "none";
    successDiv.textContent = message;
    successDiv.style.display = "block";
}
export {};
