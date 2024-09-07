let users = [];

function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    if (username && password) {
        users.push({ username, password });
        document.getElementById("signup-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("signup").classList.add("hidden");
            document.getElementById("login").classList.remove("hidden");
        }, 1000);
    }
}

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const userExists = users.find(user => user.username === username && user.password === password);

    if (userExists) {
        document.getElementById("login-message").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("login").classList.add("hidden");
            document.getElementById("contacts-list").classList.remove("hidden");
        }, 1000);
    } else {
        alert("Invalid login credentials");
    }
}

function toggleTwoVisibility(id1, id2) {
    const e1 = document.getElementById(id1);
    const e2 = document.getElementById(id2);
    const s1 = window.getComputedStyle(e1);
    const s2 = window.getComputedStyle(e2);
    const temp = s1.display
    e1.style.display = s2.display
    e2.style.display = temp;
}
