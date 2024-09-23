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
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phoneNumber}</td>
	        <td>${contact.email}</td>
			<td>${contact.createdAt}</td>
            <td class='table-buttons'>
                <button onclick="showUpdatePopup(${contact.id}, '${contact.phoneNumber}', '${contact.firstName}', '${contact.lastName}', '${contact.email}')">Update</button>
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
    clearAddInput();
    //missing field message
    let missing = false;
    if(firstName==""){
        missing=true;
    }
    else if(lastName==""){
        missing=true;
    }
    else if(phoneNumber==""){
        missing=true;
    }
    else if(email==""){
        missing=true;
    }
    if(missing){
        document.getElementById("add-result").textContent = "Missing Required Field";
        document.getElementById("add-result").style.color='red';
        return;
    }
	
	const createdAt = new Date(Date.now()).toLocaleString()
    // Construct the payload
    const payload = {
      uid: localStorage.getItem("uid"),
      phoneNumber: phoneNumber,
      firstName: firstName,
      lastName: lastName,
      email: email,
	  createdAt: createdAt
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
        document.getElementById("add-result").style.color='green';
      	fetchContactsByUid();
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
    document.getElementById('confirm-delete-box').style.display = 'block';  // Show the popup
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
        .then(response => {
            console.error("Delete Contact Successfully!");
				fetchContactsByUid();
		})
        
//        .catch(error => alert(`Error: ${error.message}`));
    }
    closeDeletePopup();  // Close the popup
}



// update contact
let contactToUpdate = null; // Variable to store the contact ID

// Function to display the update popup and prepopulate it with contact details
function showUpdatePopup(contactId, phoneNumber, firstName, lastName, email) {
    contactToUpdate = contactId;
    
    document.getElementsByClassName('container')[0].hidden=true;
    document.getElementById('add-search').hidden=true;
    document.getElementById('updateContactPopup').hidden=false;

    // Prepopulate the input fields with the existing values
    document.getElementById('update-phone').value = phoneNumber;
    document.getElementById('update-first-name').value = firstName;
    document.getElementById('update-last-name').value = lastName;
    document.getElementById('update-email').value = email;
    
    // Show the popup
    //document.getElementById('updateContactPopup').style.display = 'flex';
}

// Function to close the popup without updating
function closeUpdatePopup() {
    //document.getElementById('updateContactPopup').style.display = 'none';  // Hide the popup
    document.getElementsByClassName('container')[0].hidden=false;
    document.getElementById('add-search').hidden=false;
    document.getElementById('updateContactPopup').hidden=true;
}

// Function to send the updated contact information to the API
function confirmUpdate() {
    if (contactToUpdate !== null) {
        const updatedPhoneNumber = document.getElementById('update-phone').value;
        const updatedFirstName = document.getElementById('update-first-name').value;
        const updatedLastName = document.getElementById('update-last-name').value;
        const updatedEmail = document.getElementById('update-email').value;

        // Send the update request to the API
        fetch(`https://www.contactmanagerteamone.one/api/updateContact.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
		uid: localStorage.getItem('uid'),
		id: contactToUpdate,
                phoneNumber: updatedPhoneNumber,
                firstName: updatedFirstName,
                lastName: updatedLastName,
                email: updatedEmail
            })
        })
	    .then(response => {
	   		console.error('Update Contact Successfully!');
			fetchContactsByUid();
	    })
        .catch(error => console.error(`Error: ${error.message}`));
    }
    closeUpdatePopup();  // Close the popup
}

// Show and hide the search section
function showSearchSection() {
    //show search section if hidden
    if(document.getElementById('searchSection').hidden){
        document.getElementById('searchSection').hidden=false;
        document.getElementById('search-title').hidden=false;

        if(document.getElementById("addSection").hidden)
            document.getElementById("tableSection").style.height ="77.7%"
          else
            document.getElementById("tableSection").style.height ="65.4%"
    }
    //hide section if shown
    else{
        document.getElementById('searchSection').hidden=true;
        document.getElementById('search-title').hidden=true;

        if(document.getElementById("addSection").hidden)
            document.getElementById("tableSection").style.height ="90%"
          else
            document.getElementById("tableSection").style.height ="77.7%"
    }
}

//reset search options the search section
function resetSearchSection() {
    clearSearchInput();
    fetchContactsByUid();
}

// Search contacts based on input fields and display in the table
function searchContacts() {
    const uid = localStorage.getItem('uid'); // Assuming a static UID, adjust as needed.
    const firstName = document.getElementById('search-first-name').value.trim();
    const lastName = document.getElementById('search-last-name').value.trim();
    const phoneNumber = document.getElementById('search-phone-number').value.trim();
    const email = document.getElementById('search-email').value.trim();
    const contactTableBody = document.querySelector('#contactTable tbody');

    // Construct the JSON payload with non-empty fields
    const payload = {
        uid: uid
    };
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (phoneNumber) payload.phoneNumber = phoneNumber;
    if (email) payload.email = email;

    // Make the POST request to the API
    fetch('https://www.contactmanagerteamone.one/api/searchFuzzyContact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => displayContacts(response))
    .catch(error => {
	    const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6">No Contacts Found!</td>`;
        contactTableBody.appendChild(row);
    });
}

