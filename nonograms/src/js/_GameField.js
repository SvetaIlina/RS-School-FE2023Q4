import { appendChild, createNode } from './service.js';

export class GameField {
  constructor(size, callback) {
    this.size = size;
    this.callback = callback;
  }

  buildField() {
    this.field = createNode('div', 'game-field');
    appendChild(this.field, this.buildTable(this.size));
    appendChild(this.field, this.buildHint(this.size, 'top'));
    appendChild(this.field, this.buildHint(this.size, 'left'));

    return this.field;
  }

  buildTable(size) {
    this.table = createNode('table', 'table');
    for (let i = 1; i <= size; i++) {
      const row = createNode('tr', 'row');
      for (let j = 1; j <= size; j++) {
        const ceil = createNode('td', 'ceil');
        ceil.setAttribute('data-coord', `${i}${j}`);
        appendChild(row, ceil);
      }
      appendChild(this.table, row);
    }
    this.table.addEventListener('click', this.callback);
    return this.table;
  }

  buildHint(size, position) {
    this.hints = createNode('div', `${position}-hints`);
    for (let i = 1; i <= size; i++) {
      const container = createNode('div', `${position}-hint`);
      container.setAttribute('id', `${i}`);
      appendChild(this.hints, container);
    }
    return this.hints;
  }
}
