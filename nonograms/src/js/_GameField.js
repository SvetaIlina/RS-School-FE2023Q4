import { appendChild, createNode } from './service.js';

export class GameField {
  constructor(fiedSize, callback, targetImg, ceilSize = '25px') {
    this.fiedSize = fiedSize;
    this.ceilSize = ceilSize;
    this.callback = callback;
    this.img = targetImg;
  }

  buildField() {
    this.field = createNode('div', 'game-field');
    appendChild(this.field, this.buildTable(this.fiedSize, this.img));
    appendChild(
      this.field,
      this.buildHint(this.fiedSize, this.ceilSize, 'top')
    );
    appendChild(
      this.field,
      this.buildHint(this.fiedSize, this.ceilSize, 'left')
    );

    return this.field;
  }

  buildTable(size, img) {
    this.table = createNode('table', 'table');
    for (let i = 0; i < size; i++) {
      const row = createNode('tr', 'row');
      for (let j = 0; j < size; j++) {
        const ceil = createNode('td', 'ceil');
        ceil.style.width = this.ceilSize;
        ceil.style.height = this.ceilSize;
        ceil.setAttribute('data-coord', `${i}${j}`);
        if (img[i][j] === 1) {
          ceil.setAttribute('data-fill', true);
        }

        appendChild(row, ceil);
      }
      appendChild(this.table, row);
    }

    this.table.addEventListener('click', this.callback);
    return this.table;
  }

  buildHint(number, size, position) {
    const parentNodes = [];
    this.hints = createNode('div', `${position}-hints`);
    for (let i = 0; i < number; i++) {
      const container = createNode('div', `${position}-hint`);
      container.setAttribute('id', `${i}`);
      parentNodes.push(container);
      if (position === 'top') {
        container.style.width = size;
      } else if (position === 'left') {
        container.style.height = size;
      }

      appendChild(this.hints, container);
    }
    if (position === 'top') {
      this.setHints(parentNodes, 'column');
    } else if (position === 'left') {
      this.setHints(parentNodes, 'row');
    }
    return this.hints;
  }

  setHints(parents, direction) {
    for (let i = 0; i < this.fiedSize; i++) {
      const parent = parents.find(item => item.getAttribute('id') === `${i}`);
      let counter = 0;
      for (let j = 0; j < this.fiedSize; j++) {
        if (direction === 'row') {
          if (this.img[i][j] === 1) {
            counter += 1;
            if (j === this.fiedSize - 1) {
              this.getHint(parent, `${counter}`);
              counter = 0;
            }
          } else if (j !== 0) {
            this.getHint(parent, `${counter}`);
            counter = 0;
          }
        }
        if (direction === 'column') {
          if (this.img[j][i] === 1) {
            counter += 1;
            if (j === this.fiedSize - 1) {
              this.getHint(parent, `${counter}`);
              counter = 0;
            }
          } else if (j !== 0 && i !== this.fiedSize - 1) {
            this.getHint(parent, `${counter}`);
            counter = 0;
          }
        }
      }
    }
  }

  getHint(parentNode, innerText) {
    this.hint = createNode('div', 'hint');
    this.hint.innerText = innerText;
    this.hint.addEventListener('click', e =>
      e.target.classList.toggle('hint--checked')
    );
    appendChild(parentNode, this.hint);
  }
}
