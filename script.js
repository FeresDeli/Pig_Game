'use strict';

function newGame() {
  let scores = document.querySelectorAll('.score');
  let currentScores = document.querySelectorAll('.current-score');
  for (let i = 0; i < scores.length; i++) {
    scores[i].textContent = '0';
    currentScores[i].textContent = '0';
  }
  gameActive = true;
  rollDiceBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

function generateRandom() {
  return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  let players = document.querySelectorAll('.player');
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains('player--active')) {
      players[i].classList.remove('player--active');
    } else {
      players[i].classList.add('player--active');
    }
  }
  currentScore.textContent = '0';
  activePlayer = document.querySelector('.player--active');
  totalScore = activePlayer.querySelector('.score');
  currentScore = activePlayer.querySelector('.current-score');
  winner.textContent();
}

let gameActive = true;
let activePlayer = document.querySelector('.player--active');
let totalScore = activePlayer.querySelector('.score');
let currentScore = activePlayer.querySelector('.current-score');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
let winner = document.querySelector('.winner');
let shownNumber;

rollDiceBtn.addEventListener('click', function () {
  if (gameActive === true) {
    let randomNumber = generateRandom();
    diceImg.src = `dice-${randomNumber}.png`;
    if (randomNumber === 1) {
      switchPlayer();
    } else {
      shownNumber = Number(currentScore.textContent);
      shownNumber += randomNumber;
      currentScore.textContent = `${shownNumber}`;
      if (shownNumber + Number(totalScore.textContent) >= 100) {
        winner.textContent = `${activePlayer.querySelector('.name').textContent} wins!`;
        totalScore.textContent = `${Number(totalScore.textContent) + Number(currentScore.textContent)}`;
        rollDiceBtn.classList.add('hidden');
        holdBtn.classList.add('hidden');
        gameActive = false;
      }
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (gameActive === true) {
    let total = `${Number(totalScore.textContent) + Number(currentScore.textContent)}`;
    totalScore.textContent = total;
    switchPlayer();
  }
});

newGame();
newGameBtn.addEventListener('click', newGame);
