import { createNode, appendChild } from './js/service.js';
import { GameBtn } from './js/_Button.js';
import { Link } from './js/_Link.js';
import { btns } from './js/btnList.js';
import { GameField } from './js/_GameField.js';
import { fillCeil, startTimer } from './js/callbacks.js';
import nonograms from './js/nonograms.json' assert { type: 'json' };

const targetObj = nonograms[2];

function generateContent() {
  const wrapper = createNode('div', 'wrapper');
  document.body.prepend(wrapper);
  appendChild(wrapper, setHeader());
  appendChild(wrapper, setMainPage());
  appendChild(wrapper, setGamePage());
  setPopover();
}

function setHeader() {
  const header = createNode('header', 'header');
  header.setAttribute('data-id', 'header');
  const link = new Link(
    'instruction-link',
    'https://www.nonograms.ru/instructions',
    'How to play'
  ).buildLink();
  link.setAttribute('target', '_blank');
  appendChild(header, link);
  renderBtn(header);
  return header;
}

function setMainPage() {
  const mainPage = createNode('div', 'screen', 'main');
  const head = createNode('h1', 'title');
  head.innerText = 'Nonograms';
  mainPage.setAttribute('data-id', 'main');
  appendChild(mainPage, head);
  renderBtn(mainPage);
  return mainPage;
}

function setGamePage() {
  const gamePage = createNode('div', 'screen', 'game');
  const controlField = createNode('div', 'game-control');
  const gameField = new GameField(
    targetObj.size,
    fillCeil,
    targetObj.img[0].matrix,
    targetObj.width
  ).buildField();
  controlField.setAttribute('data-id', 'control');
  renderBtn(controlField);
  appendChild(gamePage, controlField);
  appendChild(gamePage, gameField);
  appendChild(gamePage, createTimer());
  return gamePage;
}

function createTimer() {
  const time = ['hour', 'min', 'sec'];
  const timer = createNode('div', 'timer');
  time.forEach(i => {
    const span = createNode('span', 'timer__item');
    span.setAttribute('id', `${i}`);
    span.innerText = '00';
    appendChild(timer, span);
  });
  return timer;
}

function renderBtn(parent) {
  const btnObj = btns.find(i => i.parent === parent.getAttribute('data-id'));
  btnObj.buttons.forEach(i => {
    const text = i.content;
    const callBack = i.callback;
    const btn = new GameBtn('btn', text, callBack).buildBtn();
    btn.setAttribute('id', `${text.toLowerCase().split(' ').join('-')}`);
    appendChild(parent, btn);
  });
}

function setPopover() {
  const parentPage = document.querySelector('.game');
  const trigger = document.querySelector('#select-level');
  const target = createNode('div');
  const content = createNode('div', 'level__list');
  trigger.setAttribute('popovertarget', 'level-items');
  target.setAttribute('id', 'level-items');
  target.setAttribute('popover', '');
  content.setAttribute('data-id', 'level');
  renderBtn(content);
  appendChild(target, content);
  appendChild(parentPage, target);
}

generateContent();

const table = document.querySelector('.table');
table.addEventListener('click', startTimer, {
  once: true,
});
