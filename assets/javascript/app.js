// -------------- Gif Tastic Script

//Html Elements

var addButton;
var addInputText;
var buttonContainer;
var gifContainer;

//Global Variables

var addedTopics = [
  "dougie",
  "schmurda dance",
  "milly rock",
  "twerk",
  "nae nae"
];
var requestAmount = "12";

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

function renderImages(images) {
  images.forEach(element => {
    var newDiv = $("<div class='col-12 col-md-3 py-2'>");
    var newImg = $(
      "<img data-state='still' data-active='" +
        element.active +
        "' data-still='" +
        element.still +
        "'class='gifImage' src='" +
        element.still +
        "' alt='Responsive image'/>"
    );

    newDiv.append(newImg);
    gifContainer.append(newDiv);
  });
}

function switchState(element) {
  var state = element.attr("data-state");

  if (state === "still") {
    element.attr("src", element.attr("data-active"));
    element.attr("data-state", "active");
  } else {
    element.attr("src", element.attr("data-still"));
    element.attr("data-state", "still");
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

    newButton.addClass("gifButton btn btn-dark btn-sm btn-block");
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
  //TO DO: Clear gif container before loading new GIfs
  gifContainer.empty();

  //TO DO: Get DATA from giphy API
  var topic = $(this).attr("data-value");
  var queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=" +
    topic +
    "&api_key=viyOxGTzJVhG2IiX23Vn45oAFxwNEMv7&limit=" +
    requestAmount;

  //Ajax request to API here
  $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
    var images = [];

    response.data.forEach(element => {
      var tempa = element.images.fixed_height_still.url;
      var tempb = element.images.fixed_height.url;
      var image = { still: tempa, active: tempb };
      images.push(image);
    });

    renderImages(images);

    //TO DO: create new div with Image tags and load
  });
});

$(document).on("click", ".gifImage", function() {
  switchState($(this));
});
