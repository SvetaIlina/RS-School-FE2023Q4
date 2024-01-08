// eslint-disable-next-line import/extensions
import wordList from './js/WordList.js';

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
  quiz.innerHTML =
    '<ul class="secret-word"></ul><p class="hint"><span class="strong">HINT: </span></p><p class="attempt">Incorrect guesses: <span class="attempt__incorrect">0</span> / 6</p>';
  const keyboard = createDomNode('div', 'keyboard');
  quiz.append(keyboard);
  const gallows = createDomNode('div', 'gallows');
  gallows.innerHTML =
    '<img class="gallows__image" src="images/gallows.png" alt="gallows" /><img src="images/head.png" class="body-part head" alt="head" /><img src="images/body.png" class="body-part body" alt="body" /><img src="images/leftarm.png" class="body-part leftarm" alt="leftarm" /><img    src="images/rightarm.png"class="body-part rightarm"    alt="rightarm" /> <img src="images/leftleg.png" class="body-part leftleg" alt="leftleg" /> <img src="images/rightleg.png"class="body-part rightleg"alt="rightleg"/>';

  container.append(quiz);
  container.append(gallows);
  return container;
}
