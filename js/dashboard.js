const baseurl = 'https://www.contactmanagerteamone.one/api/';

function clearInput(){
  const arr = document.getElementsByClassName("inputClear");
  for(let i = 0; i < arr.length; i++){
    arr[i].value='';
  }
}
function resetLists(){
  const arr = document.getElementsByClassName("lists");
  for(let i = 0; i < arr.length; i++){
    arr[i].innerHTML='';
  }
}
function resetResults(){
  const arr = document.getElementsByClassName("results");
  for(let i = 0; i < arr.length; i++){
    arr[i].innerHTML='';
  }
}
function logoutButton(){
  window.location.href = 'index.html';
}
//for styling
function createContactList(){
  const tableBody = document.getElementById("contactTable").getElementsByTagName("tbody")[0];
	
	for(let i=0; i<5; i++){
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>First Name</td>
      <td>Last Name</td>
      <td>Phone Number</td>
	    <td>Email@email.com</td>
      <td class='table-buttons'>
        <button onclick="showUpdatePopup(1, '123', 'Alice', 'Bob', 'email.com')">Update</button>
        <button onclick="showDeletePopup(1)">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  }
}
function showAddSection(){
  if(document.getElementById("addSection").hidden)
    document.getElementById("addSection").hidden=false;
  else
  document.getElementById("addSection").hidden=true;
}