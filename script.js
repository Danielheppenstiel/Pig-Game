'use strict';

// Selecting Elements
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const player0Score = document.querySelector('.player-0-score');
const player1Score = document.querySelector('.player-1-score');
const currScore0 = document.querySelector('.current-score-0');
const currScore1 = document.querySelector('.current-score-1');
const dice = document.querySelector('.dice');
// Buttons
const btnReset = document.querySelector('.btn-reset');
const btnDiceRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
// Starting Conditions

let scores = [0, 0];
let currentScore = 0;
let gameActive = true;
let playerActive = 0;

const changePlayer = function () {
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('active-player');
  player1El.classList.toggle('active-player');
};

// Dice Functionality
btnDiceRoll.addEventListener('click', function () {
  if (gameActive) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `Dice/dice-${diceRoll}.png`;
    dice.classList.remove('hidden');
    currentScore += diceRoll;
    document.querySelector(`.current-score-${playerActive}`).textContent =
      currentScore;
    if (diceRoll === 1) {
      document.querySelector(`.current-score-${playerActive}`).textContent = 0;
      changePlayer();
    }
  }
});

// Hold Functionality
btnHold.addEventListener('click', function () {
  if (gameActive) {
    scores[playerActive] += currentScore;
    document.querySelector(`.player-${playerActive}-score`).textContent =
      scores[playerActive];
    document.querySelector(`.current-score-${playerActive}`).textContent = 0;

    if (scores[playerActive] >= 20) {
      document.querySelector(`.player-${playerActive}`).classList.add('winner');
      dice.classList.add('hidden');
      gameActive = false;
    } else {
      changePlayer();
    }
  }
});

// Reset Functionality
btnReset.addEventListener('click', function () {
  scores = [0, 0];
  gameActive = true;
  currentScore = 0;
  playerActive = 0;
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  player0El.classList.remove('winner');
  player1El.classList.remove('winner');
  player0El.classList.add('active-player');
  player1El.classList.remove('active-player');
});
