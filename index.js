var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
$(document).keypress( function () {
    if(!started){
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        started=true;
    }
});
$("#level-title").click( function () {
    if(!started){
        $("#level-title").text("LEVEL " + level);
        nextSequence();
        started=true;
    }
});

function startOver(){
    level=0;
    gamePattern.length=0;
    userClickedPattern.length=0;
    started=false;
}
$(".btn").click (function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
    level++;
    $("#level-title").text("LEVEL " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);
  
}

function playSound(color) {
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel] ){
        // alert("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                sequence=0;
                userClickedPattern.length=0;
                nextSequence(); 
            }, 1000);
        }
    }
        
    else{
        
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
        // alert ("wrong");
    }
    
}