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
  const arr = document.getElementsByClassName("lists");
  for(let i = 0; i < arr.length; i++){
    arr[i].innerHTML='';
  }
}
function clearInput(){
  const arr = document.getElementsByClassName("inputClear");
  for(let i = 0; i < arr.length; i++){
    arr[i].value='';
  }
}
function addButton(){
  clearInput();
  document.getElementById("addResult").innerHTML="</br>Add successful"
  
  //check if email and phone number already exists
}
function searchButton(){
  //let srch = document.getElementById("searchText").value;
  let searchList = "";
  
  //get all contacts that matches srch
  
  searchList += createList()
  searchList += createList();

  //if no contacts matches srch, display no match message

  document.getElementById("searchList").innerHTML=searchList;
}
function createList(){
  let list = "<div class='tabcontainer'>";
  
  //add name, email, and phone from contacts to list
  list+="first last</br>";
  list+="email@email.com</br>";
  list+="Phone Number</br>";
  list += "</div>";
  return list;
}
function upSearchButton(){
  //let srch = document.getElementById("upSearchText").value;
  let updateList = "";
  
  //if no contacts matches srch, display no match message
  
  updateList += createUpdateList();
  updateList += createUpdateList();
  
  document.getElementById("updateList").innerHTML=updateList; 
}
function createUpdateList(){
  let list = "<div class='tabcontainer'>";
  
  //get name, email, and phone from contacts and display in input box
  list+=inputBox("name");
  list+=inputBox("email");
  list+=inputBox("phone");
  list+="<button type='button' class='buttons' onclick='updateContactButton()'>Update</button></br>";
  list+="</div>";
  return list;
}
function inputBox(value){
  let str = "<input type='text' class='inputClear' id = 'upSearchText' value='";
  str += value;
  return str + "'/></br>";
}
function delSearchButton(){
  //let srch = document.getElementById("delSearchText").value;
  let deleteList = "";
  
  //if no contacts matches srch, display no match message
  
  deleteList += createDeleteList();
  deleteList += createDeleteList();
  
  document.getElementById("deleteList").innerHTML=deleteList;
}
function createDeleteList(){
  let list = "<div class='tabcontainer'>";
  list+="first last</br>";
  list+="email@email.com</br>";
  list+="Phone Number</br>";
  list+=createDeleteButton();
  return list + "</div>";
}
function createDeleteButton(){
  let str = "<button type='button' class='buttons' onclick='deleteContactButton()'>Delete</button></br>"
  return str;
}
function deleteContactButton(){
  document.getElementById("deleteResult").innerHTML="Delete Successful";
}
function updateContactButton(){
  document.getElementById("updateResult").innerHTML="Update Saved";
}