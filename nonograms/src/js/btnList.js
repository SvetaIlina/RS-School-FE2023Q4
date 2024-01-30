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
  openLevelModal,
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
        callback: openLevelModal,
      },
      {
        content: 'Medium (10*10)',
        callback: openLevelModal,
      },
      {
        content: 'Hard (15*15)',
        callback: openLevelModal,
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
