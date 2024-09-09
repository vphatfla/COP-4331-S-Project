const BASE_URL='https://www.contactmanagerteamone.one/api/'

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

    // Create the payload
    const payload = {
        username: username,
        password: password
    };

    // Send login data to the API
    fetch(BASE_URL + 'login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // If login is successful, store the JWT in localStorage
            localStorage.setItem('jwt', data.token);

            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Show the error message if login fails
            // document.getElementById("login-error").textContent = "Invalid login credentials";
            document.getElementById("login-error").classList.remove("hidden");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again.');
    });
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
