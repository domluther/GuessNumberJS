'use strict';

/*
Code should...
Randomly generate a number and save it to a variable
Allow user to type in a guess
If the guess is right
  - log a congratulatory message
  - if score > high score - update high score
If guess is wrong
 - decrement score by 1
 - give appropriate message - too high / too low

 */
// elements I focus on
const checkButtonEle = document.querySelector('.check');
const againButtonEle = document.querySelector('.again');
const numberEle = document.querySelector('.number');
const inputEle = document.querySelector('.guess');

// value saved rather than having to read from DOM each time
let score = 20;
let highScore = 0;

const generateNumber = function () {
  // generate from 1-20 - +1 as 0-19 otherwise
  const generatedNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(generatedNumber);
  return generatedNumber;
};

const setTextContent = function (selector, newTextContent) {
  document.querySelector(selector).textContent = String(newTextContent);
};

const checkHighScore = function () {
  // score v high score - higher? update high score
  if (score > highScore) {
    highScore = score;
    setTextContent('.highscore', highScore);
  }
};

const checkNum = function () {
  // read the guess
  const guess = Number(inputEle.value);

  // blank
  if (!guess) {
    setTextContent('.message', '👹 no number!');
  } else if (guess < 1 || guess > 20) {
    setTextContent('.message', '☹ Out of range - 1 to 20 ☹️');
  } else if (guess === secretNumber) {
    // set background colour to green
    document.querySelector('body').style.backgroundColor = 'darkgreen';
    // set the context to correct number
    setTextContent('.message', '🎉 Correct number 🎉');
    // 'reveal' the answer
    setTextContent('.number', secretNumber);
    numberEle.style.width = '30rem';
    checkHighScore();
  } else if (guess !== secretNumber) {
    // incorrect guess - could be else but this is more explicit
    score--;
    setTextContent('.score', score);

    // message depends on number of lives remaining
    if (score > 0) {
      setTextContent('.message', guess < secretNumber ? 'Go ⬆' : 'Go ⬇');
    } else {
      // game over
      setTextContent('.message', 'Game over 😵');
      document.querySelector('body').style.backgroundColor = 'red';
    }
  }
};

const setupGame = function () {
  // score, message and number need resetting
  score = 20;
  setTextContent('.score', score);
  setTextContent('.message', 'Start guessing...');
  setTextContent('.number', '?');
  inputEle.value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  numberEle.style.width = '15rem';
};

// start of game - need a new number
let secretNumber = generateNumber();

// create listeners
checkButtonEle.addEventListener('click', checkNum);
againButtonEle.addEventListener('click', function () {
  // create a new number
  secretNumber = generateNumber();
  // reset status
  setupGame();
});
