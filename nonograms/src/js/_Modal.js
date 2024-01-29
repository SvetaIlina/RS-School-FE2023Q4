import { appendChild, createNode } from './service.js';

export class Modal {
  constructor(classes) {
    this.classes = classes;
  }

  buildModal(content) {
    this.overlay = createNode('div', 'overlay');
    this.modal = createNode('div', this.classes);
    this.modalContent = createNode('div', 'modal__content');
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = '';
      appendChild(this.modalContent, content);
    }
    appendChild(this.modal, this.modalContent);
    appendChild(this.overlay, this.modal);
    this.overlay.addEventListener('click', e => {
      if (e.target.classList.contains('overlay')) {
        document.querySelector('.overlay').remove();
      }
    });
    return this.overlay;
  }
}
