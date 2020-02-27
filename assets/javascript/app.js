// -------------- Gif Tastic Script

//Html Elements

var addButton;
var addInputText;
var buttonContainer;
var gifContainer;

//Global Variables

var addedTopics = ["pig", "cow", "rooster", "hen"];

//Functions
var getElements = function() {
  addButton = $("#addButton");
  buttonContainer = $("#buttonContainer");
  gifContainer = $("#gifContainer");
  addInputText = $("#addSubject");
};

//Added new topic from form, if not already included in list
function addNewTopic() {
  if (!addInputText.val() == "") {
    var temp = addInputText.val().toLowerCase();

    if (addedTopics.includes(temp)) {
      addInputText.val(null);
      alert("Already Included");
      return;
    } else {
      addedTopics.push(temp);
      addInputText.val(null);
    }
  }
}

function whatthe() {
  alert("WhatTHE");
}

//To Do: "Add" function that adds new button for each string in array
function createButtons() {
  buttonContainer.empty();

  for (i = 0; i < addedTopics.length; i++) {
    var newDiv = $("<div class='col-3 mx-auto p-1'>");

    var newButton = $("<button type='button'>");

    newButton.addClass("gifButton btn btn-outline-dark btn-sm btn-block");
    newButton.attr("data-value", addedTopics[i]);
    newButton.text(addedTopics[i]);

    newDiv.append(newButton);
    buttonContainer.append(newDiv);
  }
}

//To Do:

////----------------------------------- Event Scripts -----------------------------------------////

$("document").ready(function() {
  getElements();
  createButtons();

  addButton.on("click", function() {
    addNewTopic();
    createButtons();
  });
});

//When Gif Topics are pressed
$(document).on("click", ".gifButton", function() {
  var topic = $(this).attr("data-value");
  alert(topic + " Gif BUtton Clicked");

  //Ajax request to API here
});
