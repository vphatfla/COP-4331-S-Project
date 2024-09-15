const BASE_URL='https://www.contactmanagerteamone.one/api/';

function fetchContactsByUid() {
    // Get the uid from localStorage
    const uid = localStorage.getItem('uid');

    if (!uid) {
        console.error('uid not found in localStorage');
        return;
    }

    // Create the full URL with the uid as a query parameter
    const url = `${BASE_URL}getAllContactsByUserId.php?uid=${uid}`;

    // Make the HTTP GET request
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
	    displayContacts(response);
            return true; // Assuming the API returns JSON data
        })
        .then(data => {
            console.log('Data fetched:', data);
            // Handle the response data here
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Function to display contacts
	async function displayContacts(res) {
		const contactList = await res.json();
		const tableBody = document.getElementById("contactTable").getElementsByTagName("tbody")[0];
		tableBody.innerHTML = ""; // Clear previous content
	//	console.log(contactList);
	    contactList.forEach(contact => {
                // Create a new row
                const row = document.createElement("tr");

                // Create cells for each contact field
                Object.values(contact).forEach(value => {
                    const cell = document.createElement("td");
                    cell.textContent = value;
                    row.appendChild(cell);
                });

                // Append the row to the table body
                tableBody.appendChild(row);
            });
       	}


async function addContactFunction() {
    const firstName = document.getElementById("add-first-name").value;
    const lastName = document.getElementById("add-last-name").value;
    const email = document.getElementById("add-email").value;
    const phoneNumber = document.getElementById("add-phone").value;

    // Construct the payload
    const payload = {
      uid: localStorage.getItem("uid"),
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    try {
      const response = await fetch('https://www.contactmanagerteamone.one/api/addContact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        document.getElementById("add-result").textContent = "Contact added successfully!";
      } else {
        document.getElementById("add-result").textContent = `Error: ${result.message || 'Failed to add contact'}`;
      }
    } catch (error) {
      document.getElementById("add-result").textContent = `Error: ${error.message}`;
    }
  }
