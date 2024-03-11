import BaseComponent from '../util/baseComponent';

export default class PageView extends BaseComponent {
    constructor() {
        super({ tag: 'section', classes: [''], textContent: '' });
    }

    setContent() {
        document.body.append(this.getElement());
    }

    replaceCont(newCont: HTMLElement) {
        this.getElement().remove();
        document.body.append(newCont);
    }

    delete() {
        this.getElement().remove();
    }
}
