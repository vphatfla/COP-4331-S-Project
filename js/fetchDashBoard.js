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
            <td><span id=${'first-name'+contact.id}>${contact.firstName}</span>
                <input type="text" id="${'input-first-name'+contact.id}" hidden/>
            </td>
            <td><span id=${'last-name'+contact.id}>${contact.lastName}</span>
                <input type="text" id="${'input-last-name'+contact.id}" hidden/>
            </td>
            <td><span id=${'phone'+contact.id}>${contact.phoneNumber}</span>
                <input type="text" id="${'input-phone'+contact.id}" hidden/>
            </td>
                <td><span id=${'email'+contact.id}>${contact.email}</span>
                <input type="text" id="${'input-email'+contact.id}" hidden/>
            </td>
            <td class='table-buttons'>
                <button id=${'update-button'+contact.id} onclick="showUpdatePopup(${contact.id}, '${contact.phoneNumber}', '${contact.firstName}', '${contact.lastName}', '${contact.email}')">Update</button>
                <button id=${'update-update-button'+contact.id} onclick="confirmUpdate()" hidden>Update</button>
                
                <button id=${'delete-button'+contact.id} onclick="showDeletePopup(${contact.id})">Delete</button>
                <button id=${'cancel-update-button'+contact.id} onclick="cancelUpdateButton(${contact.id})" hidden>Cancel</button>
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
        return;
    }

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
      	//fetchContactsByUid();
      } else {
        document.getElementById("add-result").textContent = `Error: ${result.message || 'Failed to add contact'}`;
      }
    } catch (error) {
      document.getElementById("add-result").textContent = `Error: ${error.message}`;
    }
    resetResults();
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
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();  // Reload the page on success
            } else {
                console.error(`Error deleting contact: ${data.message}`);
            	window.location.reload();
	    }
        })
        .catch(error => console.error(`Error: ${error.message}`));
    }
    closeDeletePopup();  // Close the popup
}



// update contact
let contactToUpdate = null; // Variable to store the contact ID

// Function to display the update popup and prepopulate it with contact details
function showUpdatePopup(contactId, phoneNumber, firstName, lastName, email) {
    contactToUpdate = contactId;
    
    //replace values in row to input
    document.getElementById('first-name'+contactId).hidden=true;
    document.getElementById('input-first-name'+contactId).hidden=false;
    document.getElementById('last-name'+contactId).hidden=true;
    document.getElementById('input-last-name'+contactId).hidden=false;
    document.getElementById('phone'+contactId).hidden=true;
    document.getElementById('input-phone'+contactId).hidden=false;
    document.getElementById('email'+contactId).hidden=true;
    document.getElementById('input-email'+contactId).hidden=false;

    //replace delete button with cancel
    document.getElementById('update-button'+contactId).hidden=true;
    document.getElementById('update-update-button'+contactId).hidden=false;

    document.getElementById('delete-button'+contactId).hidden=true;
    document.getElementById('cancel-update-button'+contactId).hidden=false;

    // Prepopulate the input fields with the existing values
    document.getElementById('input-first-name'+contactId).value = firstName;
    document.getElementById('input-last-name'+contactId).value = lastName;
    document.getElementById('input-phone'+contactId).value = phoneNumber;
    document.getElementById('input-email'+contactId).value = email;
}

// Function to close the popup without updating
function closeUpdatePopup() {
    document.getElementById('updateContactPopup').hidden = true;
    document.getElementById('tableSection').hidden = false;
    document.getElementById('add-search').hidden=false;
}

// Function to send the updated contact information to the API
function confirmUpdate() {
    if (contactToUpdate !== null) {
        const updatedPhoneNumber = document.getElementById('input-phone'+contactToUpdate).value;
        const updatedFirstName = document.getElementById('input-first-name'+contactToUpdate).value;
        const updatedLastName = document.getElementById('input-last-name'+contactToUpdate).value;
        const updatedEmail = document.getElementById('input-email'+contactToUpdate).value;

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
	    .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.reload();  // Reload the page on success
            } else {
                console.error(`Update Status: ${data.message}`);
		        //fetchContactsByUid();
            }
        })
        .catch(error => console.error(`Error: ${error.message}`));
    }
    cancelUpdateButton(contactToUpdate);  // Close the popup
}

// Show and hide the search section
function showSearchSection() {
    //show search section if hidden
    if(document.getElementById('searchSection').hidden){
        document.getElementById('searchSection').hidden=false;
        document.getElementById('search-title').hidden=false;

        if(document.getElementById("addSection").hidden)
            document.getElementById("tableSection").style.height ="82.7%"
          else
            document.getElementById("tableSection").style.height ="70.4%"
    }
    //hide section if shown
    else{
        document.getElementById('searchSection').hidden=true;
        document.getElementById('search-title').hidden=true;

        if(document.getElementById("addSection").hidden)
            document.getElementById("tableSection").style.height ="95%"
          else
            document.getElementById("tableSection").style.height ="82.7%"
    }
    fetchContactsByUid();
}

//reset search options the search section
function resetSearchSection() {
    clearSearchInput();
    //fetchContactsByUid();
    resetResults(); 
    document.getElementById("tableSection").hidden=true;
}

// Search contacts based on input fields and display in the table
function searchContacts() {
    const uid = localStorage.getItem('uid'); // Assuming a static UID, adjust as needed.
    const firstName = document.getElementById('search-first-name').value.trim();
    const lastName = document.getElementById('search-last-name').value.trim();
    const phoneNumber = document.getElementById('search-phone-number').value.trim();
    const email = document.getElementById('search-email').value.trim();
    const contactTableBody = document.querySelector('#contactTable tbody');

    //return if all search input empty
    if(firstName=="" && lastName=="" && phoneNumber=="" && email==""){
        document.getElementById("tableSection").hidden=true;
        document.getElementById("search-result").textContent="Requires at least one search"
        return;
    }

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
        row.innerHTML = `<td colspan="5">No Contacts Found!</td>`;
        contactTableBody.appendChild(row);
    });
    document.getElementById("tableSection").hidden=false;
    resetResults();
}

