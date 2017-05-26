//initialize the example row here 
var tableBody = $('#sushi-body');
var trow = $('<tr>');
var data1 = $('<td>').text("ie. Salmon Skin Roll");
var data2 = $('<td>').text("ie. Musashi's Sushi Restaurant");
trow.append(data1);
trow.append(data2);
tableBody.append(trow);

//holds all the data the user enters into the form
//is initialized with just the examples
var data = [];

var tbody = $('#sushi-body');
//check if there is anything in local storage and if there is, load the data into the table
if(localStorage["sushi-list"]) {
  /*this takes each entry in the data array and runs the build table functio on it. sushiData is just the variable we give to each sushi object entry in the array*/
  data = JSON.parse(localStorage["sushi-list"]);
  data.forEach(function(sushiData) {
    var tr = buildTable(sushiData);
    tbody.append(tr);
  });
}

//function handlers
$('#newItemButton').on('click', handleNewItemButton);
$('#submit').on('click', addToArray);
$('#cancel').on('click', handleCancel);
$('#clearTable').on('click', clearTable);

//handler for the new item button
/*will hide the table and reveal the form*/
function handleNewItemButton() {
  //gets the h3 header just before the table
  var tableH3 = $('h1 + h3');
  //gets the div with the table
  var table = $('#table');
  //gets the div with the form
  var form = $('#form');
  //hides the table heading
  tableH3.css('display', 'none');
  //hides the table
  table.css('display', 'none');
  //reveals the form
  form.css('display', 'block'); 
}

//add user input to the data array
function addToArray() {
  //gets the input for the sushi field
  var sushiVal = $('#sushiEntry').val();
  //gets the form input for the restaurant field
  var restVal = $('#restEntry').val();
  //error handling
  if (sushiVal == "" || restVal == "") {
    alert("Please enter a sushi name and restaurant!");
  } else {
    //adds what the user entered into the object array
    data.push({sushi: sushiVal, restaurant: restVal});
    //call the buildTable function
    /*this gets the body of the table we put on the html*/
    var tbody = $('#sushi-body');
    /*make sure the table is empty each time we add entries*/
    tbody.html("");
    
    //add the example row here 
    var trow = $('<tr>');
    var data1 = $('<td>').text("ie. Salmon Skin Roll");
    var data2 = $('<td>').text("ie. Musashi's Sushi Restaurant");
    trow.append(data1);
    trow.append(data2);
    tbody.append(trow);
    
    /*this takes each entry in the data array and runs the build table functio on it. sushiData is just the variable we give to each sushi object entry in the array*/
    data.forEach(function(sushiData) {
      var tr = buildTable(sushiData);
      tbody.append(tr);
    });
    //reveal the table and hide the form
    var tableH3 = $('h1 + h3');
    var table = $('#table');
    var form = $('#form');
    tableH3.css('display', 'block');
    table.css('display', 'block');
    form.css('display', 'none');
    //clear the form fields
    $('#sushiEntry').val("");
    $('#restEntry').val("");
    //save the data to localStorage in addition to having it in the local array
    localStorage["sushi-list"] = JSON.stringify(data);
  }
}

//build the table with the data array. The code below dynamically builds a table
function buildTable(sushiData) {
  //creates a new row
  var tr = $('<tr>');
  //creates a new column and append to row
  var td = $('<td>').text(sushiData.sushi);
  tr.append(td);
  //create new column and append to row
  var td = $('<td>').text(sushiData.restaurant);
  tr.append(td);
  return tr;  
}

/*handle the cancel by simply revealing the table again*/
function handleCancel() {
  //reveal the table and hide the form
  var tableH3 = $('h1 + h3');
  var table = $('#table');
  var form = $('#form');
  tableH3.css('display', 'block');
  table.css('display', 'block');
  form.css('display', 'none');
}

//function to clear the table
function clearTable() {
  localStorage.clear();
}