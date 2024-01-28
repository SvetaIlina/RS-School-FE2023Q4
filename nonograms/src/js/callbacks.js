import { getZero } from './service.js';

let interval;

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

export function openModal() {
  console.log(openModal);
}

export function fillCeil(event) {
  let sound;

  if (event.button === 0 && !event.target.classList.contains('ceil--crossed')) {
    sound = new Audio('./src/assets/sound/fill.mp3');
    event.target.classList.toggle('ceil--fill');
    sound.play();
  } else if (
    event.button === 2 &&
    !event.target.classList.contains('ceil--fill')
  ) {
    event.preventDefault();
    sound = new Audio('./src/assets/sound/cross.mp3');
    event.target.classList.toggle('ceil--crossed');
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
