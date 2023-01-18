

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];




var started = false;
var level = 0;

$("#level-title").click(function () {
    if (started == false) {
        var random = Math.floor(Math.random() * buttonColours.length)
        $("h1").css("background-color", buttonColours[random]);
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


var media = matchMedia("(max-width:900px)");

$(document).ready(function(){
    if(media.matches){
        $("h1").text("Tap here to start");
    }
})






$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1);
})

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        console.log("Error");
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over!");
        setTimeout(function(){
            if(media.matches){
                $("h1").text("Tap here to start over.");
            }
            else{
                $("h1").text("Click here to start over.");
            }
           
        }, 2000);

        startOver()
    }

}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}