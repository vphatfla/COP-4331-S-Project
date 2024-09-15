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
