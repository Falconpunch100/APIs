var apiKey = "ANxa4V1JRT7lTE9t96JnF1VOlJZqc077";
var topics = ['RuneScape', 'Fire Emblem', 'Paper Mario', 'Legend of Zelda', 'Kirby']
var chosenTopic = "";
var urlBase = "https://api.giphy.com/v1/gifs/search";

function createButton() {
    
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button type="button" class="btn btn-outline-danger buttons">');
      a.addClass("topics");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons").append(a);
    }
}

$(document).ready(function() {
    createButton();
    addClickEvent();
    $("#topic-input").keydown(function(e) {
    console.log(e.which);
    if (e.which === 13){
      e.preventDefault();
      createNewTopic($("#topic-input").val());
      addClickEvent();
    }
    });
      $("#add-topic").click(function(e) {
        e.preventDefault();
        createNewTopic($("#topic-input").val());
        addClickEvent();
      });  
});

function grabIMG() {
    var queryURL = urlBase + "?q=" + chosenTopic + "&api_key=" + apiKey + "&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== undefined){
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
      }
      var topicDiv = $("<div>");
      var personImage = $("<img>");
      personImage.attr("still-version", results[i].images.fixed_height_still.url);
      personImage.attr("gif-version", results[i].images.fixed_height.url);
      personImage.attr("src", results[i].images.fixed_height_still.url);
      topicDiv.prepend(p);
      personImage.addClass("gifAni");
      topicDiv.prepend(personImage);

      $("#images").prepend(topicDiv);
    }
  });
  animateGif();
}

function createNewTopic(topicName){
  var a = $('<button type="button" class="btn btn-outline-danger buttons">');
  a.addClass("topics");
  a.text(topicName);
  a.attr("data-name", topicName);
  $("#buttons").append(a);
}

function addClickEvent(){
$(".topics").each(function(){
  $(this);
  $(this).click(function(){
   chosenTopic = $(this).text();
  grabIMG();
  });
});
}

function animateGif(){
  $("#images").on("click", "img.gifAni", function(){
    if($(this).attr("src") === $(this).attr("still-version")){
      var movingGif = $(this).attr("gif-version");
      $(this).attr("src", movingGif);
    }
    else {
      var stillGif = $(this).attr("still-version");
      $(this).attr("src", stillGif);
    }
  });
}