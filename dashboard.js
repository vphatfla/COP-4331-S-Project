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

  clearInput();
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
  document.getElementById("searchList").innerHTML=searchList;
}
function createList(){
  let list = "<div class='tabcontainer'>";
  
  //add name, email, and phone from contacts to list
  list+="first last</br>";
  list+="email@email.com</br>";
  list+="Phone Number</br>";
  
  return list += "</div>";
}