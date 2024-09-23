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
  resetResults();
  clearAddInput();
  clearSearchInput();
  document.getElementById("tableSection").hidden=true;
}
//for styling
function createContactList(){
  const tableBody = document.getElementById("contactTable").getElementsByTagName("tbody")[0];
	
	for(let i=0; i<15; i++){
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><span id=${'first-name'+i}>First Name</span>
        <input type="text" id="${'input-first-name'+i}" hidden/>
      </td>
      <td><span id=${'last-name'+i}>Last Name</span>
        <input type="text" id="${'input-last-name'+i}" hidden/>
      </td>
      <td><span id=${'phone'+i}>Phone Number</span>
        <input type="text" id="${'input-phone'+i}" hidden/>
      </td>
	    <td><span id=${'email'+i}>Email</span>
        <input type="text" id="${'input-email'+i}" hidden/>
      </td>
      <td class='table-buttons'>
        <button id=${'update-button'+i} onclick="showUpdatePopup(${i}, '123', 'Alice', 'Bob', 'email.com')">Update</button>
        <button id=${'update-update-button'+i} onclick="confirmUpdate()" hidden>Update</button>
        
        <button id=${'delete-button'+i} onclick="showDeletePopup(${i})">Delete</button>
        <button id=${'cancel-update-button'+i} onclick="cancelUpdateButton(${i})" hidden>Cancel</button>
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
function cancelUpdateButton(contactId){
  document.getElementById('first-name'+contactId).hidden=false;
  document.getElementById('input-first-name'+contactId).hidden=true;
  document.getElementById('last-name'+contactId).hidden=false;
  document.getElementById('input-last-name'+contactId).hidden=true;
  document.getElementById('phone'+contactId).hidden=false;
  document.getElementById('input-phone'+contactId).hidden=true;
  document.getElementById('email'+contactId).hidden=false;
  document.getElementById('input-email'+contactId).hidden=true;

  document.getElementById('update-button'+contactId).hidden=false;
  document.getElementById('update-update-button'+contactId).hidden=true;
  document.getElementById('delete-button'+contactId).hidden=false;
  document.getElementById('cancel-update-button'+contactId).hidden=true;
}