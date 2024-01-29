import { appendChild, createNode } from './service.js';

export class Modal {
  constructor(classes) {
    this.classes = classes;
  }

  buildModal(content) {
    this.overlay = createNode('div', 'overlay');
    this.modal = createNode('div', this.classes);
    if (typeof content === 'string') {
      this.modal.innerHTML = content;
    } else {
      this.modal.innerHTML = '';
      appendChild(this.modal, content);
    }

    appendChild(this.overlay, this.modal);
    this.overlay.addEventListener('click', e => {
      if (e.target.classList.contains('overlay')) {
        document.querySelector('.overlay').remove();
      }
    });
    return this.overlay;
  }
}
