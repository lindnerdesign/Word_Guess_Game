//Random word picked from array
var guessedWord = ['cowboys', 'bonfire', 'shotgun'];
var maskedWord = [];

var randomWord = guessedWord[Math.floor(Math.random() * (guessedWord.length))];

for(i=0; i<randomWord.length; i++) {
  maskedWord.push("_");

} document.getElementById("body").onkeypress = guessedWord() {maskedWord()};
