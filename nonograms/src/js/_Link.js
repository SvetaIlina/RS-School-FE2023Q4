import { createNode } from './service.js';

export class Link {
  constructor(classes, href, text) {
    this.classes = classes;
    this.href = href;
    this.text = text;
  }

  buildLink() {
    this.link = createNode('a', this.classes);
    this.link.setAttribute('href', this.href);
    this.link.innerText = this.text;
    return this.link;
  }
}
