//Guessed word list
var wordList = ["cowboy","ranch","campfire","wagonwheel"];

//Maximum amount of tries = 10
const maxTries = 10;

//variables for game to work
var lettersGuessed = [];
var guessingWord = [];
var guessesRemaining = [];
var wordIndex;
var gameStart = false;
var gameFinish = false;
var wins = 0;

//GAME RESET FUNCTION
function resetGame() {
    guessesRemaining = maxTries;
    gameStart = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Clear out arrays
    lettersGuessed = [];
    guessingWord = [];

    // Make sure the hangman image is cleared
    document.getElementById("hangmanImage").src = "";

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[wordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

// FUNCTION 2
//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += lettersGuessed[i];
    }
    document.getElementById("remainingGuesses").innerText = guessesRemaining;
    document.getElementById("guessedLetters").innerText = lettersGuessed;
    if(guessesRemaining <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        gameFinish = true;
    }
};

// Updates the image depending on how many guesses
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - guessesRemaining) + ".png";
};

document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(gameFinish) {
        resetGame();
        gameFinish = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess(letter) {
    if (guessesRemaining > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        // Make sure we didn't use this letter yet
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[wordIndex].length; i++) {
        if(selectableWords[wordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        guessesRemaining--;
        updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        gameFinish = true;
    }
};
