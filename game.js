const buttonColours = ['red', 'blue', 'green', 'yellow'];

let userClickedPattern = [];
let gamePattern = [];
let level = 0;

function nextSequence() {
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    $("h1").text(`Level ${level}`);
    level++

    console.log(gamePattern);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");

    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");
      }, 100);
}

//need to check every element of array before next sequence


function checkAnswer(currentLevel) {
    
    for(let i = 0; i < userClickedPattern.length; i++) { 
        if(gamePattern[i] == userClickedPattern[i]) {
            console.log("pass");
            
      } else if(gamePattern[i] !== userClickedPattern[i]){
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 400);
        let gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("h1").text(`GAME OVER! Click to Restart.`);


        gamePattern = [];
        userClickedPattern = [];
        level = 0;

        $(document).one("mousedown", function() {
            nextSequence();
            $("h1").text(`Level ${level}`);
            // level++;
        });

      }
  }

    
    
    let i = 0;
    if(JSON.stringify(gamePattern) == JSON.stringify(currentLevel)) {
        console.log('success');
        setTimeout(function(){
            i++;
            userClickedPattern = [];
            nextSequence();
          }, 1000);   

        if(currentLevel.length < gamePattern.legnth) {
            setTimeout(function(){
                checkAnswer();
              }, 1000);
           
            }
        }         
}

//.one METHOD allows event to trigger callback function only one time
$(document).one( "mousedown", function() {
    nextSequence();
    $("h1").text(`Level ${level}`);
    level++;
});



// EVENT HANDLER FOR CLICK, callback functions stores selected ID and pushed into user array
$(".btn").click(function() {
    let userChosenColor = (this.id);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern);

  });

