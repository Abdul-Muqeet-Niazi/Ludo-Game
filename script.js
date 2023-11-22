"use scripts";

let finalScore0 = document.querySelector("#score--0");
let finalScore1 = document.querySelector("#score--1");
let diceEl = document.querySelector(".dice");
let currentScore0 = document.querySelector("#current--0");
let currentScore1 = document.querySelector("#current--1");
let player0 = document.querySelector(".player--0");
let player1 = document.querySelector(".player--1");
let playerNew = document.querySelector(".btn--new");
let playerHold = document.querySelector(".btn--hold");
let playerRoll = document.querySelector(".btn--roll");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  finalScore0.textContent = 0;
  finalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

document.addEventListener("click", function () {
  if (playing) {
    // Rolling the Dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display the Dice
    diceEl.classList.remove("hidden");

    // Work on Dice
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();

      // if (activePlayer === 0) {
      //     activePlayer = 1;
      // } else {
      //     activePlayer = 0
      // }
    }
  }
});

playerHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore Wrote for Example
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

playerNew.addEventListener("click", init);
