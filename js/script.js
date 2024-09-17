const BASE_URL='https://www.contactmanagerteamone.one/api/'

let users = [];

function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const retypePassword = document.getElementById("retyped-signup-password").value;
    const matchErrorElement = document.getElementById("signup-password-error");
	if (password !== retypePassword) {
        matchErrorElement.classList.remove("hidden");
        return;
	}
	else {
		matchErrorElement.classList.add("hidden");
	}
	const payload = {
		username: username,
		password: password
	}

	// Send sign up data to the API
    fetch(BASE_URL + 'signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
		if (response.status !== 201) {
     		throw new Error('Request failed');
    	}

		document.getElementById("signup-message").classList.remove("hidden");
		toggleTwoVisibility('signup', 'login');
    })
    .catch(error => {
        console.error('Error:', error);
        const errorElement = document.getElementById("signup-error");
        errorElement.classList.remove("hidden");
        errorElement.classList.add("error");
		// alert('An error occurred while logging in. Please try again.');
    });
    
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
	    localStorage.setItem('uid', data.uid);
            // Redirect to the dashboard
            window.location.href = 'board.html';
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
