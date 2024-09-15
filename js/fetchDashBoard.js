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
	
	contactList.forEach(contact => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${contact.phoneNumber}</td>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.email}</td>
            <td>
                <button onclick="updateContact(${contact.id})">Update</button>
                <button onclick="showDeletePopup(${contact.id})">Delete</button>
            </td>
        `;

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

let contactIdToDelete = null;
// Function to display the confirmation popup
function showDeletePopup(contactId) {
    contactIdToDelete = contactId;
    document.getElementById('confirm-delete-box').style.display = 'flex';  // Show the popup
}

// Function to close the popup without deleting
function closeDeletePopup() {
    document.getElementById('confirm-delete-box').style.display = 'none';  // Hide the popup
}

// Function to handle the actual deletion after confirmation
function confirmDelete() {
    if (contactIdToDelete !== null) {
        // Send the DELETE request to the API
        fetch(`https://www.contactmanagerteamone.one/api/deleteContactById.php?contactId=${contactIdToDelete}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
		    { 
			contactId: contactIdToDelete,
		    	uid: localStorage.getItem('uid')
			}
	    )  // Send the contact ID for deletion
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();  // Reload the page on success
            } else {
                alert(`Error deleting contact: ${data.message}`);
            	window.location.reload();
	    }
        })
        .catch(error => alert(`Error: ${error.message}`));
    }
    closeDeletePopup();  // Close the popup
}
