import {
  getZero,
  appendChild,
  createNode,
  checkSound,
  transformWinsGameArray,
  createWinTable,
  getCeilstatus,
  getTime,
  getWinTime,
} from './service.js';
import nonograms from './nonograms.json' assert { type: 'json' };
import { GameField } from './_GameField.js';
import { Modal } from './_Modal.js';

let interval;
let selectedImg = {};
let winGames = JSON.parse(localStorage.getItem('wins'));

//btns callbacks

export function showResult() {
  transformWinsGameArray(winGames);
  const winModal = new Modal('modal');
  const winTable = createWinTable(winGames);
  appendChild(document.body, winModal.buildModal(winTable));
}

export function changeTheme() {
  const text = '--theme: dark;';
  if (document.documentElement.style.cssText === text) {
    document.documentElement.style.cssText = '';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.style.cssText = text;
    localStorage.setItem('theme', 'dark');
  }
}

export function startNewgame(event) {
  randomGame(event);
  event.target.parentNode.classList.add('up');
}

export function loadSavedGame() {
  const saveObj = JSON.parse(localStorage.savedGame);
  const obj = nonograms.find(i => i.id === saveObj.level);
  const img = obj.img.find(i => i.id === saveObj.id);
  updateField(obj, img);
  document
    .querySelector('table')
    .removeEventListener('click', startTimer, { once: true });
  const { curSec, curMin, curHour } = saveObj.time;
  const { sec, min, hour } = getTime();
  sec.innerText = curSec;
  min.innerText = curMin;
  hour.innerText = curHour;
  const ceils = document.querySelectorAll('.ceil');
  ceils.forEach(ceil => {
    const [i, j] = ceil.dataset.coord.split('-');
    if (saveObj.currentMatrix[i][j] === 1) {
      ceil.classList.add('ceil--fill');
    } else if (saveObj.currentMatrix[i][j] === -1) {
      ceil.classList.add('crossed');
    }
  });
  document
    .querySelector('table')
    .addEventListener('click', e => startTimer(e, +curSec, +curMin, +curHour), {
      once: true,
    });

  event.target.parentNode.classList.add('up');
}
export function saveGame() {
  const { sec, min, hour } = getTime();
  const time = {
    curSec: sec.innerText,
    curMin: min.innerText,
    curHour: hour.innerText,
  };
  const saveGame = {};
  Object.assign(saveGame, selectedImg);
  const arr = JSON.parse(JSON.stringify(selectedImg.matrix));
  const ceils = document.querySelectorAll('.ceil');
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
  appendChild(
    document.body,
    new Modal('modal').buildModal('the game was saved')
  );
  setTimeout(() => document.querySelector('.overlay').remove(), 1000);
  localStorage.savedGame = JSON.stringify(saveGame);
}
export function showSolution() {
  const { feild, allCeils, fillCeils, emptyCeil } = getCeilstatus();

  allCeils.forEach(ceil => ceil.classList.remove('ceil--fill', 'crossed'));
  fillCeils.forEach(ceil => ceil.classList.add('ceil--fill'));
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

    appendChild(wrapper, image, title);
    appendChild(content, wrapper);
  });
  appendChild(document.body, new Modal('modal').buildModal(content));
}
export function goToMainPage() {
  document.querySelectorAll('.screen').forEach(i => i.classList.remove('up'));
}

// tables callbacks

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

export function startTimer(e, timerSec = 0, timerMin = 0, timerHour = 0) {
  const { sec, min, hour } = getTime();
  let countSec = timerSec;
  let countMin = timerMin;
  let countHour = timerHour;
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
export function checkSolution() {
  const filledCeil = ceil => ceil.classList.contains('ceil--fill');
  const { feild, allCeils, fillCeils, emptyCeil } = getCeilstatus();
  if (fillCeils.every(filledCeil) && !emptyCeil.some(filledCeil)) {
    clearInterval(interval);
    allCeils.forEach(ceil => ceil.classList.remove('crossed'));
    feild.classList.add('game-field--disable');
    openGongratsModal(selectedImg);
    winGames.push({
      name: selectedImg.id,
      img: selectedImg.src,
      level: selectedImg.level,
      time: getWinTime(),
    });
    localStorage.setItem('wins', JSON.stringify(winGames));
  }
}

// sound-btn callback

export function manageSound(event) {
  event.target.classList.toggle('crossed');
  if (event.target.classList.contains('crossed')) {
    localStorage.setItem('sound', 'off');
  } else {
    localStorage.setItem('sound', 'on');
  }
}

// callbacks helpers
function resetTimer() {
  const { sec, min, hour } = getTime();
  sec.innerText = '00';
  min.innerText = '00';
  hour.innerText = '00';
  clearInterval(interval);
}

function updateField(object, img) {
  const newField = new GameField(
    object.size,
    img.matrix,
    object.width
  ).buildField();
  document.querySelector('.game-field').replaceWith(newField);
  if (localStorage.getItem('sound') === 'off') {
    document.querySelector('.sound-btn').classList.add('crossed');
  }
  resetTimer();
  selectedImg.id = img.id;
  selectedImg.src = img.src;
  selectedImg.matrix = img.matrix;
  selectedImg.level = object.id;
  console.log(selectedImg);
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
  appendChild(content, title, sound, image);
  appendChild(document.body, new Modal('modal').buildModal(content));
  if (!checkSound()) {
    sound.play();
  }
}
