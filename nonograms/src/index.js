import { createNode, appendChild } from './js/service.js';
import { GameBtn } from './js/_Button.js';
import { Link } from './js/_Link.js';

const btns = [
  {
    parent: 'header',
    buttons: ['Best results', 'Change theme'],
  },
  {
    parent: 'main',
    buttons: ['New game', 'Continue last game'],
  },
  {
    parent: 'level',
    buttons: ['Easy (5*5)', 'Medium (10*10)', 'Hard(15*15)', 'Random game'],
  },
  {
    parent: 'control',
    buttons: [
      'Select level',
      'Show solution',
      'Reset game',
      'Change puzzle',
      'Save game',
      'Main page',
    ],
  },
];

// const table = document.querySelector('table');
// table.addEventListener('click', e => {
//   if (e.target.classList.contains('ceil')) {
//     e.target.classList.toggle('ceil--clicked');
//   }
// });

// const btn2 = document.querySelector('.new-game-btn');
// const btn4 = document.querySelector('.main-page-btn');

// btn2.addEventListener('click', e => {
//   e.target.parentNode.classList.add('up');
// });
// // btn3.addEventListener('click', e => {
// //   e.target.parentNode.classList.add('up');
// // });
// btn4.addEventListener('click', () => {
//   document.querySelectorAll('.screen').forEach(i => i.classList.remove('up'));
// });

// const btn = document.querySelector('.theme');
// btn.addEventListener('click', () => {
//   const text = '--theme: dark;';
//   if (document.documentElement.style.cssText === text) {
//     document.documentElement.style.cssText = '';
//   } else {
//     document.documentElement.style.cssText = text;
//   }
// });

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

function renderBtn(parent) {
  const btnObj = btns.find(i => i.parent === parent.getAttribute('data-id'));
  btnObj.buttons.forEach(i => {
    const btn = new GameBtn('btn').buildBtn(i);
    btn.setAttribute('data-id', `${i.toLowerCase().split(' ').join('-')}`);
    appendChild(parent, btn);
  });
}

appendChild(document.body, setHeader());
