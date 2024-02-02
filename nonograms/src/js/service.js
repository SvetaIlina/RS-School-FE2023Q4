function createNode(element, ...classes) {
  const node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function appendChild(node, ...child) {
  child.forEach(i => node.append(i));
}

function getZero(count) {
  if (count >= 0 && count < 10) {
    return `0${count}`;
  }
  return count;
}

function checkSound() {
  const soundTrigger = document.querySelector('.sound-btn');
  return soundTrigger.classList.contains('crossed');
}

function transformWinsGameArray(arr) {
  arr.sort((a, b) => a.time - b.time);
  if (arr.length > 5) {
    arr.splice(5);
  }
}

function createWinTable(arr) {
  const gameList = createNode('table', 'win-list');
  const title = createNode('tr', 'table-title');
  const titleName = createNode('th', 'win-descr');
  titleName.innerText = 'name';
  const titleImg = createNode('th', 'win-descr');
  titleImg.innerText = 'image';
  const titleLevel = createNode('th', 'win-descr');
  titleLevel.innerText = 'level';
  const titleTime = createNode('th', 'win-descr');
  titleTime.innerText = 'time';
  appendChild(title, titleName, titleImg, titleLevel, titleTime);
  appendChild(gameList, title);
  arr.forEach(game => {
    const gameItem = createNode('tr', 'win-item');
    const gameName = createNode('td', 'win-descr');
    gameName.innerText = game.name;
    const gameImg = createNode('td', 'win-descr');
    const winImg = createNode('img', 'win-img');
    winImg.src = game.img;
    appendChild(gameImg, winImg);
    const gameLevel = createNode('td', 'win-descr');
    gameLevel.innerText = game.level;
    const gameTime = createNode('td', 'win-descr');
    gameTime.innerText = `${game.time} sec`;
    appendChild(gameItem, gameName, gameImg, gameLevel, gameTime);

    appendChild(gameList, gameItem);
  });
  return gameList;
}

function getCeilstatus() {
  const feild = document.querySelector('.game-field');
  const ceils = Array.from(document.querySelectorAll('.ceil'));
  const mustBeFill = ceils.filter(ceil => ceil.dataset.fill === 'true');
  const notFill = ceils.filter(ceil => ceil.dataset.fill === 'false');
  return {
    feild,
    allCeils: ceils,
    fillCeils: mustBeFill,
    emptyCeil: notFill,
  };
}

function getTime() {
  const sec = document.querySelector('#sec');
  const min = document.querySelector('#min');
  const hour = document.querySelector('#hour');
  return {
    sec,
    min,
    hour,
  };
}

function getWinTime() {
  const { sec, min, hour } = getTime();
  const winSec = +sec.innerText;
  const winMin = +min.innerText;
  const winHour = +hour.innerText;
  const winTime = winSec + winMin * 60 + winHour * 3600;

  return winTime;
}

export {
  createNode,
  appendChild,
  getZero,
  checkSound,
  transformWinsGameArray,
  createWinTable,
  getCeilstatus,
  getTime,
  getWinTime,
};
