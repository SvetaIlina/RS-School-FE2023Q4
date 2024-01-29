import { getZero, appendChild } from './service.js';
import nonograms from './nonograms.json' assert { type: 'json' };
import { GameField } from './_GameField.js';
import { Modal } from './_Modal.js';

let interval;
let obj;
let img;

export function showResult() {
  console.log('showRes');
}

export function changeTheme() {
  const text = '--theme: dark;';
  if (document.documentElement.style.cssText === text) {
    document.documentElement.style.cssText = '';
  } else {
    document.documentElement.style.cssText = text;
  }
}

export function startNewgame(event) {
  event.target.parentNode.classList.add('up');
}

export function continueSavedGame() {
  console.log(continueSavedGame);
}
export function showSolution() {
  console.log(showSolution);
}
export function resetGame() {
  console.log(resetGame);
}
export function saveGame() {
  stopTimer();
}
export function goToMainPage() {
  document.querySelectorAll('.screen').forEach(i => i.classList.remove('up'));
}

export function openModal(e) {
  console.log(e.target);
  appendChild(document.body, new Modal('modal').buildModal('ffffg'));
}

export function fillCeil(event) {
  let sound;
  const soundTrigger = document.querySelector('.sound-btn');

  if (event.button === 0 && !event.target.classList.contains('crossed')) {
    sound = new Audio('./src/assets/sound/fill.mp3');
    event.target.classList.toggle('ceil--fill');
  } else if (
    event.button === 2 &&
    !event.target.classList.contains('ceil--fill')
  ) {
    event.preventDefault();
    sound = new Audio('./src/assets/sound/cross.mp3');
    event.target.classList.toggle('crossed');
  }
  if (!soundTrigger.classList.contains('crossed')) {
    sound.play();
  }
}

export function startTimer() {
  const sec = document.querySelector('#sec');
  const min = document.querySelector('#min');
  const hour = document.querySelector('#hour');
  let countSec = 0;
  let countMin = 0;
  let countHour = 0;
  interval = setInterval(updateTimer, 1000);
  function updateTimer() {
    countSec++;
    if (countSec > 59) {
      countMin++;
      min.innerText = getZero(countMin);
      countSec = 0;
    }
    if (countMin > 59) {
      countHour++;
      hour.innerText = getZero(countHour);
      countMin = 0;
    }
    sec.innerText = getZero(countSec);
  }
}

function stopTimer() {
  clearInterval(interval);
}

export function manageSound(event) {
  event.target.classList.toggle('crossed');
}

export function randomGame() {
  const objInd = Math.floor(Math.random() * nonograms.length);
  obj = nonograms[objInd];
  img = obj.img[Math.floor(Math.random() * obj.img.length)];
  updateField(obj, img);
}

function updateField(obj, img) {
  const newField = new GameField(obj.size, img.matrix, obj.width).buildField();

  document.querySelector('.game-field').replaceWith(newField);
}
