import { createNode } from './service.js';

export class GameBtn {
  constructor(classes, id) {
    this.classes = classes;
    this.id = id;
  }

  buildBtn(text) {
    this.btn = createNode('button', this.classes);
    if (typeof text === 'string') {
      this.btn.innerText = text;
    }
    return this.btn;
  }

  bindEvents(callback) {
    this.btn.addEventListener('click', callback);
  }
}
