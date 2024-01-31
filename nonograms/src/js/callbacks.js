import { getZero, appendChild, createNode, checkSound } from './service.js';
import nonograms from './nonograms.json' assert { type: 'json' };
import { GameField } from './_GameField.js';
import { Modal } from './_Modal.js';

let interval;
let selectedImg = {};

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
  randomGame(event);
  event.target.parentNode.classList.add('up');
}

export function continueSavedGame() {
  const saveObj = JSON.parse(localStorage.savedGame);
  console.log(saveObj);
}
export function showSolution() {
  const { feild, allCeils, fillCeil, emptyCeil } = getCeilstatus();

  allCeils.forEach(ceil => ceil.classList.remove('ceil--fill', 'crossed'));
  fillCeil.forEach(ceil => ceil.classList.add('ceil--fill'));
  emptyCeil.forEach(ceil => ceil.classList.add('crossed'));
  feild.classList.add('game-field--disable');
  clearInterval(interval);
}
export function resetGame() {
  const allCeils = getCeilstatus().allCeils;
  const feild = getCeilstatus().feild;
  const table = document.querySelector('.table');
  allCeils.forEach(ceil => ceil.classList.remove('ceil--fill', 'crossed'));

  if (feild.classList.contains('game-field--disable')) {
    feild.classList.remove('game-field--disable');
    table.addEventListener('click', startTimer, { once: true });
    resetTimer();
  }
}
export function saveGame() {
  const time = getTime();
  const saveGame = {};
  const arr = JSON.parse(JSON.stringify(selectedImg.matrix));
  const ceils = document.querySelectorAll('.ceil');
  Object.assign(saveGame, selectedImg);
  ceils.forEach(ceil => {
    const [i, j] = ceil.dataset.coord.split('-');
    if (ceil.classList.contains('ceil--fill')) {
      arr[i][j] = 1;
    } else if (ceil.classList.contains('crossed')) {
      arr[i][j] = -1;
    } else {
      arr[i][j] = 0;
    }
  });
  saveGame.currentMatrix = arr;
  saveGame.time = time;
  localStorage.savedGame = JSON.stringify(saveGame);
}
export function goToMainPage() {
  document.querySelectorAll('.screen').forEach(i => i.classList.remove('up'));
}

export function openLevelModal(e) {
  let objId;
  if (e.target.getAttribute('id') !== 'change-puzzle') {
    objId = e.target.getAttribute('id');
  } else {
    objId = selectedImg.level;
  }
  const object = nonograms.find(i => i.id === objId);
  const content = createNode('div', 'modal-content');
  object.img.forEach(i => {
    const wrapper = createNode('div', 'modal-item', 'level-cont');
    const image = createNode('img', 'modal-img');
    const title = createNode('h6', 'item-title');
    title.innerText = `${i.id.toUpperCase()}`;
    image.setAttribute('src', `${i.src}`);
    wrapper.addEventListener('click', () => {
      const img = object.img.find(item => item.id === i.id);
      updateField(object, img);
      document.querySelector('.overlay').remove();
    });

    appendChild(wrapper, image);
    appendChild(wrapper, title);
    appendChild(content, wrapper);
  });
  appendChild(document.body, new Modal('modal').buildModal(content));
}

export function fillCeil(event) {
  let sound;

  if (event.target.classList.contains('ceil')) {
    if (event.type === 'click' && !event.target.classList.contains('crossed')) {
      sound = new Audio('./src/assets/sound/fill.mp3');
      event.target.classList.toggle('ceil--fill');
    } else if (
      event.type === 'contextmenu' &&
      !event.target.classList.contains('ceil--fill')
    ) {
      sound = new Audio('./src/assets/sound/cross.mp3');
      event.target.classList.toggle('crossed');
    }
    if (!checkSound()) {
      sound.play();
    }
  }
}

export function startTimer() {
  const { sec, min, hour } = getTime();
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

function resetTimer() {
  const { sec, min, hour } = getTime();
  sec.innerText = '00';
  min.innerText = '00';
  hour.innerText = '00';
  clearInterval(interval);
}

export function manageSound(event) {
  event.target.classList.toggle('crossed');
}

export function randomGame(e) {
  let obj;
  let objInd = 0;
  if (e.target.getAttribute('id') === 'random-game') {
    objInd = Math.floor(Math.random() * nonograms.length);
  }
  obj = nonograms[objInd];
  const img = obj.img[Math.floor(Math.random() * obj.img.length)];
  updateField(obj, img);
}

export function checkSolution() {
  const filledCeil = ceil => ceil.classList.contains('ceil--fill');
  const { feild, allCeils, fillCeil, emptyCeil } = getCeilstatus();
  if (fillCeil.every(filledCeil) && !emptyCeil.some(filledCeil)) {
    clearInterval(interval);
    allCeils.forEach(ceil => ceil.classList.remove('crossed'));
    feild.classList.add('game-field--disable');
    openGongratsModal(selectedImg);
  }
}

function getCeilstatus() {
  const feild = document.querySelector('.game-field');
  const ceils = Array.from(document.querySelectorAll('.ceil'));
  const mustBeFill = ceils.filter(ceil => ceil.dataset.fill === 'true');
  const notFill = ceils.filter(ceil => ceil.dataset.fill === 'false');
  return {
    feild: feild,
    allCeils: ceils,
    fillCeil: mustBeFill,
    emptyCeil: notFill,
  };
}

function updateField(object, img) {
  const newField = new GameField(
    object.size,
    img.matrix,
    object.width
  ).buildField();
  document.querySelector('.game-field').replaceWith(newField);
  resetTimer();
  selectedImg.id = img.id;
  selectedImg.src = img.src;
  selectedImg.matrix = img.matrix;
  selectedImg.level = object.id;
  selectedImg.size = object.size;
  // console.log(selectedImg);
}

function openGongratsModal(someImg) {
  const content = createNode('div', 'modal-item'),
    image = createNode('img', 'modal-img'),
    title = createNode('h6', 'item-title'),
    time = getWinTime(),
    sound = createNode('audio', 'audio');
  sound.setAttribute('src', './src/assets/sound/happy.mp3');
  title.innerText = `Great! You have solved the nonogram in ${time} seconds!`;
  image.setAttribute('src', `${someImg.src}`);
  appendChild(content, title);
  appendChild(content, sound);
  appendChild(content, image);
  appendChild(document.body, new Modal('modal').buildModal(content));
  if (!checkSound()) {
    sound.play();
  }
}

function getTime() {
  const sec = document.querySelector('#sec');
  const min = document.querySelector('#min');
  const hour = document.querySelector('#hour');
  return {
    sec: sec,
    min: min,
    hour: hour,
  };
}

function getWinTime() {
  const { sec, min, hour } = getTime(),
    winSec = +sec.innerText,
    winMin = +min.innerText,
    winHour = +hour.innerText,
    winTime = winSec + winMin * 60 + winHour * 3600;

  return winTime;
}
