const table = document.querySelector('table');
table.addEventListener('click', e => {
  e.target.style.backgroundColor = 'white';
});

const btn = document.querySelector('.new-game');

btn.addEventListener('click', e => {
  e.target.parentNode.classList.add('up');
});

console.log(123);
