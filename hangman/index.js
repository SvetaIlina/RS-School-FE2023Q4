// eslint-disable-next-line import/extensions
import wordList from './js/WordList.js';

const maxAttempt = 6;
const hiddenLetters = [];
let rightattempt = 0;
let attempts = 0;
let secretWord;

function createDomNode(element, ...classes) {
  const node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function generateMainContent() {
  const container = createDomNode('div', 'container');
  container.innerHTML =
    '<h4 class="game-title">Let\'s play the GAME...</h4><h4 class="game-title">Try to guess the word before it\'s too late</h4>';
  const quiz = createDomNode('div', 'quiz');
  quiz.innerHTML = `<ul class="secret-word"></ul><p class="hint"><span class="strong">HINT: </span></p><p class="attempt">Incorrect guesses: <span class="attempt__incorrect">0</span> / 6</p>`;
  const keyboard = createDomNode('div', 'keyboard');
  keyboard.addEventListener('click', (event) => playGame(event));
  quiz.append(keyboard);
  const gallows = createDomNode('div', 'gallows');
  gallows.innerHTML =
    '<img class="gallows__image" src="images/gallows.png" alt="gallows" /><img src="images/head.png" class="body-part head" alt="head" /><img src="images/body.png" class="body-part body" alt="body" /><img src="images/leftarm.png" class="body-part leftarm" alt="leftarm" /><img    src="images/rightarm.png"class="body-part rightarm"    alt="rightarm" /> <img src="images/leftleg.png" class="body-part leftleg" alt="leftleg" /> <img src="images/rightleg.png"class="body-part rightleg"alt="rightleg"/>';

  container.append(quiz);
  container.append(gallows);
  return container;
}

function createKeyboard(parentSelector) {
  const parent = document.querySelector(parentSelector);
  for (let i = 97; i <= 122; i++) {
    const btn = createDomNode('button', 'keybtn');
    btn.innerText = String.fromCharCode(i);
    btn.setAttribute('id', String.fromCharCode(i));
    parent.append(btn);
  }
}

function selectQuestion(hintSelector) {
  const parentNode = document.querySelector(hintSelector);
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  if (parentNode.childNodes.length > 1) {
    parentNode.lastChild.data = hint;
  } else {
    parentNode.insertAdjacentHTML('beforeend', hint);
  }
  secretWord = word.split('');
  console.log(word);
}

function generateSecretWord(parentSelector) {
  document.querySelector(parentSelector).innerHTML = '';
  secretWord.forEach(() => {
    const letter = createDomNode('li', 'letter');
    document.querySelector(parentSelector).append(letter);
    hiddenLetters.push(letter);
  });
}

function checkLetter(key) {
  const bodyParts = document.querySelectorAll('.body-part');
  if (key) {
    if (secretWord.includes(key)) {
      secretWord.forEach((item, i) => {
        if (item === key) {
          hiddenLetters[i].innerText = key;
          hiddenLetters[i].classList.add('letter--guessed');
          rightattempt += 1;
        }
      });
    } else {
      bodyParts[attempts].classList.add('body-part--opened');
      attempts++;
      document.querySelector('.attempt__incorrect').innerText = attempts;
    }
  }
}

function disableBtn(tapBtn) {
  const btn = document.querySelector(`#${tapBtn}`);
  btn.classList.add('keybtn--disabled');
}

function playGame(e) {
  if (attempts === maxAttempt || rightattempt === secretWord.length) return;
  let clickedBtn;
  if (e.type === 'click' && e.target.tagName.toLowerCase() === 'button') {
    clickedBtn = e.target.innerText.toLowerCase();
  }
  if (
    e.type === 'keydown' &&
    /Key[A-Z]/.test(e.code) &&
    !e.altKey &&
    !e.ctrlKey &&
    !e.shiftKey
  ) {
    clickedBtn = e.key.toLowerCase();
  }

  if (
    clickedBtn &&
    !document
      .querySelector(`#${clickedBtn}`)
      .classList.contains('keybtn--disabled')
  ) {
    checkLetter(clickedBtn);
    disableBtn(clickedBtn);
    gameOver();
  }
}

function gameOver() {
  if (attempts === maxAttempt) {
    setTimeout(() => generateModal(false), 500);
  }
  if (rightattempt === secretWord.length) {
    setTimeout(() => generateModal(true), 500);
  }
}

function generateModal(isWin) {
  let message;
  const modal = createDomNode('div', 'modal');
  const content = createDomNode('div', 'modal__content');
  const btn = createDomNode('button', 'keybtn');
  btn.addEventListener('click', () => rePlay());
  if (isWin) {
    message = "Congratulations, you've won!!!";
  } else {
    message = 'Unfortunately, you lost...';
  }
  content.innerHTML = `<h3 class="modal__mes">${message}</h3><h4 class="modal__answer">The correct word was <span class="correct-word">${secretWord.join(
    '',
  )}</span></h4>`;
  btn.innerText = 'Play again';
  content.append(btn);
  modal.append(content);
  document.body.append(modal);
  document.querySelector('.container').classList.toggle('container--hide');
}

function rePlay() {
  attempts = 0;
  rightattempt = 0;
  hiddenLetters.length = 0;
  document
    .querySelectorAll('.keybtn')
    .forEach((i) => i.classList.remove('keybtn--disabled'));
  document
    .querySelectorAll('.body-part')
    .forEach((i) => i.classList.remove('body-part--opened'));
  document.querySelector('.modal').remove();
  document.querySelector('.container').classList.toggle('container--hide');
  document.querySelector('.attempt__incorrect').innerText = attempts;
  selectQuestion('.hint');
  generateSecretWord('.secret-word');
}

document.body.append(generateMainContent());
createKeyboard('.keyboard');
selectQuestion('.hint');
generateSecretWord('.secret-word');
document.addEventListener('keydown', (event) => playGame(event));
