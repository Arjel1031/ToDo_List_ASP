const signUpBtn = document.getElementById("signUpButton") as HTMLButtonElement | null;

signUpBtn?.addEventListener("click", () => {
    window.location.href = "/Html/signup.html";
});

const loginBtn = document.getElementById("loginButton") as HTMLButtonElement | null;

loginBtn?.addEventListener("click", () => {
    window.location.href = "/Html/toDoList.html";
});

