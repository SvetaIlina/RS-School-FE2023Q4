import { getZero, appendChild, createNode, checkSound } from './service.js';
import nonograms from './nonograms.json' assert { type: 'json' };
import { GameField } from './_GameField.js';
import { Modal } from './_Modal.js';

let interval;
let selectedImg = {};
let winGames = JSON.parse(localStorage.getItem('wins'));

function transformWinsGame(arr) {
  arr.sort(function (a, b) {
    return a.time - b.time;
  });
  if (arr.length > 5) {
    arr.splice(5);
  }
}

export function showResult() {
  transformWinsGame(winGames);
  const winModal = new Modal('modal');
  const winTable = createWinTable(winGames);
  appendChild(document.body, winModal.buildModal(winTable));
}

function createWinTable(arr) {
  const gameList = createNode('table', 'win-list');
  const title = createNode('tr', 'table-title');
  const titleName = createNode('th', 'win-descr');
  titleName.innerText = 'name';
  appendChild(title, titleName);
  const titleImg = createNode('th', 'win-descr');
  titleImg.innerText = 'image';
  appendChild(title, titleImg);
  const titleLevel = createNode('th', 'win-descr');
  titleLevel.innerText = 'level';
  appendChild(title, titleLevel);
  const titleTime = createNode('th', 'win-descr');
  titleTime.innerText = 'time';
  appendChild(title, titleTime);
  appendChild(gameList, title);
  arr.forEach(game => {
    const gameItem = createNode('tr', 'win-item');
    const gameName = createNode('td', 'win-descr');
    gameName.innerText = game.name;
    appendChild(gameItem, gameName);
    const gameImg = createNode('td', 'win-descr');
    const winImg = createNode('img', 'win-img');
    winImg.src = game.img;
    appendChild(gameImg, winImg);
    appendChild(gameItem, gameImg);
    const gameLevel = createNode('td', 'win-descr');
    gameLevel.innerText = game.level;
    appendChild(gameItem, gameLevel);
    const gameTime = createNode('td', 'win-descr');
    gameTime.innerText = `${game.time} sec`;
    appendChild(gameItem, gameTime);

    appendChild(gameList, gameItem);
  });
  return gameList;
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

export function continueSavedGame() {
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
  const { sec, min, hour } = getTime();
  const time = {
    curSec: sec.innerText,
    curMin: min.innerText,
    curHour: hour.innerText,
  };
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
  appendChild(
    document.body,
    new Modal('modal').buildModal('the game was saved')
  );
  setTimeout(() => document.querySelector('.overlay').remove(), 1000);
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
      // document
      //   .querySelector('table')
      //   .addEventListener('click', startTimer, { once: true });
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

function resetTimer() {
  const { sec, min, hour } = getTime();
  sec.innerText = '00';
  min.innerText = '00';
  hour.innerText = '00';
  clearInterval(interval);
}

export function manageSound(event) {
  event.target.classList.toggle('crossed');
  if (event.target.classList.contains('crossed')) {
    localStorage.setItem('sound', 'off');
  } else {
    localStorage.setItem('sound', 'on');
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
  // document
  //   .querySelector('table')
  //   .addEventListener('click', startTimer, { once: true });
}

export function checkSolution() {
  const filledCeil = ceil => ceil.classList.contains('ceil--fill');
  const { feild, allCeils, fillCeil, emptyCeil } = getCeilstatus();
  if (fillCeil.every(filledCeil) && !emptyCeil.some(filledCeil)) {
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
