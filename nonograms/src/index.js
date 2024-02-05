import './sass/style.scss';
import { createNode } from './js/service.js';
import { GameBtn } from './js/_Button.js';
import { Link } from './js/_Link.js';
import { btns } from './js/btnList.js';
import { GameField } from './js/_GameField.js';

generateContent();

function generateContent() {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.style.cssText = '--theme: dark;';
  }
  const wrapper = createNode('div', 'wrapper');
  document.body.prepend(wrapper);
  wrapper.append(setHeader(), setMainPage(), setGamePage());
  setPopover();
}

function setHeader() {
  const header = createNode('header', 'header');
  header.dataset.id = 'header';
  const link = new Link(
    'instruction-link',
    'https://www.nonograms.ru/instructions',
    'How to play'
  ).buildLink();
  link.setAttribute('target', '_blank');
  header.append(link);
  renderBtn(header);
  return header;
}

function setMainPage() {
  const mainPage = createNode('div', 'screen', 'main');
  const head = createNode('h1', 'title');
  head.innerText = 'Nonograms';
  mainPage.dataset.id = 'main';
  mainPage.append(head);
  renderBtn(mainPage);
  return mainPage;
}

function setGamePage() {
  const gamePage = createNode('div', 'screen', 'game');
  const controlField = createNode('div', 'game-control');
  const gameField = new GameField().buildField();
  controlField.dataset.id = 'control';
  renderBtn(controlField);
  gamePage.append(controlField, gameField, createTimer());
  return gamePage;
}

function createTimer() {
  const time = ['hour', 'min', 'sec'];
  const timer = createNode('div', 'timer');
  time.forEach(i => {
    const span = createNode('span', 'timer__item');
    span.setAttribute('id', `${i}`);
    span.innerText = '00';
    timer.append(span);
  });
  return timer;
}

function renderBtn(parent) {
  const btnObj = btns.find(i => i.parent === parent.dataset.id);
  btnObj.buttons.forEach(i => {
    const str = i.content;
    const text = str
      .match(/[^*)(\d]/gi)
      .join('')
      .trim();

    const callBack = i.callback;
    const btn = new GameBtn('btn', str, callBack).buildBtn();
    btn.setAttribute('id', `${text.toLowerCase().split(' ').join('-')}`);
    parent.append(btn);
    if (parent.classList.contains('level__list')) {
      btn.setAttribute('popovertargetaction', 'hide');
      btn.setAttribute('popovertarget', 'level-items');
    }
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
  content.dataset.id = 'level';
  renderBtn(content);
  target.append(content);
  parentPage.append(target);
}
