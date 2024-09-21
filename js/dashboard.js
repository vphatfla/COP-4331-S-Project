const baseurl = 'https://www.contactmanagerteamone.one/api/';

function clearAddInput(){
  const arr = document.getElementsByClassName("add-input");
  for(let i = 0; i < arr.length; i++){
    arr[i].value='';
  }
}
function clearSearchInput(){
  const arr = document.getElementsByClassName("search-input");
  for(let i = 0; i < arr.length; i++){
    arr[i].value='';
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
	
	for(let i=0; i<15; i++){
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
  if(document.getElementById("addSection").hidden){
    clearAddInput();
    document.getElementById("addSection").hidden=false;
    document.getElementById("add-title").hidden=false;
    
    if(document.getElementById("searchSection").hidden)
      document.getElementById("tableSection").style.height ="82.7%"
    else
      document.getElementById("tableSection").style.height ="70.4%"
  }
  else{
    document.getElementById("addSection").hidden=true;
    document.getElementById("add-title").hidden=true;

    if(document.getElementById("searchSection").hidden)
      document.getElementById("tableSection").style.height ="95%"
    else
      document.getElementById("tableSection").style.height ="82.7%"
  }
}