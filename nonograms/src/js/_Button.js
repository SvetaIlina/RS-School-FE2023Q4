import { createNode } from './service.js';

export class GameBtn {
  constructor(classes, text, callback) {
    this.classes = classes;
    this.text = text;
    this.cb = callback;
  }

  buildBtn() {
    this.btn = createNode('button', this.classes);
    if (typeof this.text === 'string') {
      this.btn.innerText = this.text;
    }
    if (this.cb) {
      this.btn.addEventListener('click', this.cb);
    }
    return this.btn;
  }
}
