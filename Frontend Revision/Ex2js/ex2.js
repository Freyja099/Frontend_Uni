var choice = document.getElementsByName('choix');
var table = document.getElementById("table");
var text = document.getElementById('addElement');

var td = document.createElement('td');
var textNode = document.createTextNode("" + text.value);
td.document.appendChild(textNode);

var updateButton = document.getElementById("update-button");
var deleteButton = document.getElementById("delete-button");
