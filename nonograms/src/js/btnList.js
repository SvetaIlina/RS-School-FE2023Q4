import {
  showResult,
  changeTheme,
  startNewgame,
  continueSavedGame,
  showSolution,
  resetGame,
  saveGame,
  goToMainPage,
  randomGame,
  openModal,
} from './callbacks.js';

export const btns = [
  {
    parent: 'header',
    buttons: [
      { content: 'Best results', callback: showResult },
      { content: 'Change theme', callback: changeTheme },
    ],
  },
  {
    parent: 'main',
    buttons: [
      { content: 'New game', callback: startNewgame },
      { content: 'Continue last game', callback: continueSavedGame },
    ],
  },
  {
    parent: 'level',
    buttons: [
      {
        content: 'Easy (5*5)',
        callback: openModal,
      },
      {
        content: 'Medium (10*10)',
        callback: openModal,
      },
      {
        content: 'Hard (15*15)',
        callback: openModal,
      },
      {
        content: 'Random game',
        callback: randomGame,
      },
    ],
  },
  {
    parent: 'control',
    buttons: [
      {
        content: 'Select level',
      },
      {
        content: 'Show solution',
        callback: showSolution,
      },
      {
        content: 'Reset game',
        callback: resetGame,
      },
      {
        content: 'Change puzzle',
      },
      {
        content: 'Save game',
        callback: saveGame,
      },
      {
        content: 'Main page',
        callback: goToMainPage,
      },
    ],
  },
];
