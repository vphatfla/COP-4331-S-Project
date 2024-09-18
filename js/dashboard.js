const baseurl = 'https://www.contactmanagerteamone.one/api/';

function openTab(evt, tab) {
  // Declare all variables
  var i, tabcontent, tablinks;
  
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";

  //reset tabs
  clearInput();
  resetLists();
  resetResults();
  resetSearchSection();
}
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