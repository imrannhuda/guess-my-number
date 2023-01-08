"use strict";

// generate secret number
let secretNumber;
let generateSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};
generateSecretNumber();

// store initial message in a variable
const initialMessage = document.querySelector(".message").textContent;

// starting scores
let score = 20;
let highscore = 0;

// store initial background-1 and background-2 in variables
const initialBackground1 = getComputedStyle(
  document.documentElement
).getPropertyValue("--background");
const initialBackground2 = getComputedStyle(
  document.documentElement
).getPropertyValue("--background-2");

// function for updating textContent
let updateTextContent = function (query, content) {
  document.querySelector(query).textContent = content;
};

// function for changing color
let updateColor = function (theme) {
  // change background to green
  if (theme === "green") {
    document.documentElement.style.setProperty(
      "--background",
      initialBackground2
    );
    document.documentElement.style.setProperty(
      "--background-2",
      initialBackground1
    );
  }

  // change background to black
  if (theme === "black") {
    document.documentElement.style.setProperty(
      "--background",
      initialBackground1
    );
    document.documentElement.style.setProperty(
      "--background-2",
      initialBackground2
    );
  }
};

// function for checking the number
let checkNumber = function () {
  // store the guess in a variable
  let guess = Number(document.querySelector(".guess").value);

  // if there is no guess
  if (!guess) {
    updateTextContent(".message", "You didn't enter any number.");
  }

  // if the guess is correct
  else if (guess === secretNumber) {
    updateTextContent(".message", "Correct! :)");
    updateTextContent(".number", secretNumber);
    updateColor("green");

    // update highscore
    if (score > highscore) {
      highscore = score;
      updateTextContent(".highscore", highscore);
    }
  }

  // if the guess is wrong
  else if (guess !== secretNumber) {
    // if there are chances left
    if (score > 0) {
      guess > secretNumber
        ? updateTextContent(".message", "Too high!")
        : updateTextContent(".message", "Too low!");
      score--;
      updateTextContent(".score", score);
      updateColor("black");
    }

    // if there are no chances left
    else {
      updateTextContent(".message", "Game over! :(");
      updateColor("black");
    }
  }
};

// when player clicks "Check number"
document.querySelector(".check-button").addEventListener("click", function () {
  checkNumber();
});

// when player presses Enter
document.querySelector(".guess").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkNumber();
  }
});

// when the player clicks "Play again"
document.querySelector(".again-button").addEventListener("click", function () {
  generateSecretNumber();
  score = 20;
  updateTextContent(".score", score);
  updateTextContent(".message", initialMessage);
  updateTextContent(".number", "?");
  document.querySelector(".guess").value = "";
  updateColor("black");
});
