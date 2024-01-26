export function showResult() {
  console.log('showRes');
}

export function changeTheme() {
  const text = '--theme: dark;';
  if (document.documentElement.style.cssText === text) {
    document.documentElement.style.cssText = '';
  } else {
    document.documentElement.style.cssText = text;
  }
}

export function startNewgame(event) {
  event.target.parentNode.classList.add('up');
}

export function continueSavedGame() {
  console.log(continueSavedGame);
}
export function showSolution() {
  console.log(showSolution);
}
export function resetGame() {
  console.log(resetGame);
}
export function saveGame() {
  console.log();
}
export function goToMainPage() {
  document.querySelectorAll('.screen').forEach(i => i.classList.remove('up'));
}

export function openModal() {
  console.log(openModal);
}

export function markCeil(event) {
  if (event.target.classList.contains('ceil')) {
    event.target.classList.toggle('ceil--clicked');
  }
}
