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
  document.getElementById("addResult").innerHTML="</br>Add successful"
  
  //check if email and phone number already exists
}
function searchButton(){
  let srch = document.getElementById("searchText").value;
  resetLists();
  
  //get all contacts that matches srch
  //if no contacts matches srch, display no match message

  createList();
  createList();
}
function createList(input){
  let list = document.getElementById("searchList");
  
  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  
  //check checkboxes
  if(document.getElementById("searchFname").checked)
    doc.append("fname\n");
  if(document.getElementById("searchLname").checked)
    doc.append("lname\n");
  if(document.getElementById("searchEmail").checked)
    doc.append("email\n");
  if(document.getElementById("searchPhone").checked)
    doc.append("phone\n");
  
  list.appendChild(doc);
}
function upSearchButton(){
  let srch = document.getElementById("upSearchText").value;
  resetLists();
  
  //if no contacts matches srch, display no match message
  for(let i = 0; i<3; i++){
    createUpdateList(i);
  }
}
function createUpdateList(id){
  let list = document.getElementById("updateList");
  
  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  
  //check checkboxes
  if(document.getElementById("updateFname").checked)
    doc.append("fname\n");
  if(document.getElementById("updateLname").checked)
    doc.append("lname\n");
  if(document.getElementById("updateEmail").checked)
    doc.append("email\n");
  if(document.getElementById("updatePhone").checked)
    doc.append("phone\n");
  
  doc.appendChild(createUpdateButton(id));
  
  list.appendChild(doc);
}
function createUpdateButton(id){
  var btn = document.createElement("button");
  var btnId = "upBtn"+id;
  
  btn.setAttribute("id", btnId);
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "buttons");
  btn.setAttribute("onClick", "updateContactButton(this.id)");
  
  btn.append("Update");
  return btn;
}
function delSearchButton(){
  let srch = document.getElementById("delSearchText").value;
  resetLists();
  
  //if no contacts matches srch, display no match message
  for(let i = 0; i<2; i++){
    createDeleteList(i);
  }
}
function createDeleteList(id){
  let list = document.getElementById("deleteList");
  
  var doc = document.createElement("div");
  doc.setAttribute("class","tabcontainer");
  
  //check checkboxes
  if(document.getElementById("deleteFname").checked)
    doc.append("fname\n");
  if(document.getElementById("deleteLname").checked)
    doc.append("lname\n");
  if(document.getElementById("deleteEmail").checked)
    doc.append("email\n");
  if(document.getElementById("deletePhone").checked)
    doc.append("phone\n");
  
  doc.appendChild(createDeleteButton(id));
  
  list.appendChild(doc);
}
function createDeleteButton(id){
  var btn = document.createElement("button");
  var btnId = "delBtn"+id;

  btn.setAttribute("id", btnId);
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "buttons");
  btn.setAttribute("onClick", "deleteContactButton(this.id)");
  
  btn.append("Delete");
  return btn;
}
function deleteContactButton(id){
  document.getElementById("deleteResult").innerHTML=id;
}
function updateContactButton(id){
  document.getElementById("updateList").hidden=true;
  document.getElementById("updateBox").hidden=false;
}
function updateButton(){
  document.getElementById("updateResult").innerHTML="update successful";
}