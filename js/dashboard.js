const baseurl = 'https://www.contactmanagerteamone.one/api/';
let deleteid =0;


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
function addButton(){
  clearInput();
  document.getElementById("add-result").innerHTML="</br>Add successful"
  
  //check if email and phone number already exists
}
function searchButton(){
  let srch = document.getElementById("search-text").value;
  resetLists();
  
  for(let i = 0; i<2; i++){
    createList(i);
  }
}
function createList(){
  let list = document.getElementById("search-list");
  
  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  
  //check checkboxes
  if(document.getElementById("search-first-name").checked)
    doc.append("fname\n");
  if(document.getElementById("search-last-name").checked)
    doc.append("lname\n");
  if(document.getElementById("search-email").checked)
    doc.append("email\n");
  if(document.getElementById("search-phone").checked)
    doc.append("phone\n");
  
  list.appendChild(doc);
}
function upSearchButton(){
  let srch = document.getElementById("update-search-text").value;
  resetLists();
  
  for(let i = 0; i<5; i++){
    createUpdateList(i);
  }
  document.getElementById("update-list").hidden=false;
  document.getElementById("update-box").hidden=true;
}
function createUpdateList(id){
  let list = document.getElementById("update-list");
  
  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  
  //check checkboxes
  if(document.getElementById("update-first-name").checked)
    doc.append("fname\n");
  if(document.getElementById("update-last-name").checked)
    doc.append("lname\n");
  if(document.getElementById("update-email").checked)
    doc.append("email\n");
  if(document.getElementById("update-phone").checked)
    doc.append("phone\n");
  
  doc.appendChild(createUpdateButton(id));
  
  list.appendChild(doc);
}
function createUpdateButton(id){
  var btn = document.createElement("button");
  var btnId = "update-button-"+id;
  
  btn.setAttribute("id", btnId);
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "buttons");
  btn.setAttribute("onClick", "updateContactButton(this.id)");
  
  btn.append("Update");
  return btn;
}
//update buttons in list
function updateContactButton(id){
  document.getElementById("update-list").hidden=true;
  document.getElementById("update-box").hidden=false;
  
  //set values of update input boxes to values from database
  document.getElementById("update-First-name").value="first";
  document.getElementById("update-Last-name").value="last";
  document.getElementById("update-Email").value="email";
  document.getElementById("update-Phone").value="phone";
}
//update button in box
function updateButton(){
  document.getElementById("update-result").innerHTML="update successful";
  document.getElementById("update-list").hidden=false;
  document.getElementById("update-box").hidden=true;
}
function updateCancelButton(){
  document.getElementById("update-list").hidden=false;
  document.getElementById("update-box").hidden=true;
}
function delSearchButton(){
  let srch = document.getElementById("delete-search-text").value;
  resetLists();
  
  for(let i = 0; i<2; i++){
    createDeleteList(i);
  }
}
function createDeleteList(id){
  let list = document.getElementById("delete-list");

  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  doc.setAttribute("id", "delete-"+id);
  //check checkboxes
  if(document.getElementById("delete-first-name").checked)
    doc.append("fname\n");
  if(document.getElementById("delete-last-name").checked)
    doc.append("lname\n");
  if(document.getElementById("delete-email").checked)
    doc.append("email\n");
  if(document.getElementById("delete-phone").checked)
    doc.append("phone\n");
  
  doc.appendChild(createDeleteButton(id));
  
  list.appendChild(doc);
}
function createDeleteButton(id){
  var btn = document.createElement("button");
  var btnId = "delete-button-"+id;

  btn.setAttribute("id", btnId);
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "buttons");
  btn.setAttribute("onClick", "deleteContactButton(this.id)");
  
  btn.append("Delete");
  return btn;
}
//delete button in list
function deleteContactButton(id){
  deleteid=id.replace("button-","");
  //show confirm message
  document.getElementById("confirm-delete-box").style.display='block';
}
//cancel button in delete confirm box
function cancelDeleteButton(){
  document.getElementById('confirm-delete-box').style.display='none'
}
//delete button in delete confirm box
function confirmDeleteButton(){
  document.getElementById(deleteid).remove();
  document.getElementById('confirm-delete-box').style.display='none'
  document.getElementById("delete-result").innerHTML=deleteid;
}
function logoutButton(){
  window.location.href = 'index.html';
}
