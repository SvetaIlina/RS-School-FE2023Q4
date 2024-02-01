import { appendChild, createNode } from './service.js';

export class Modal {
  constructor(classes) {
    this.classes = classes;
  }

  buildModal(content) {
    this.overlay = createNode('div', 'overlay');
    this.modal = createNode('div', this.classes);
    this.closeBtn = createNode('button', 'close-btn');
    this.closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="30" height="30"><path d="M19,2H5C2.243,2,0,4.243,0,7v10c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm3,15c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V7c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v10Zm-5.793-7.793l-2.793,2.793,2.793,2.793c.391,.391,.391,1.023,0,1.414-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293l-2.793-2.793-2.793,2.793c-.195,.195-.451,.293-.707,.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l2.793-2.793-2.793-2.793c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.793,2.793,2.793-2.793c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Z"/></svg>';
    if (typeof content === 'string') {
      this.modal.innerText = content;
    } else {
      appendChild(this.modal, content);
    }
    appendChild(this.modal, this.closeBtn);

    appendChild(this.overlay, this.modal);

    this.overlay.addEventListener('click', this.closeModal);

    return this.overlay;
  }

  closeModal(e) {
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('close-btn')
    ) {
      if (document.querySelector('audio')) {
        document.querySelector('audio').pause();
      }

      document.querySelector('.overlay').remove();
    }
  }
}
