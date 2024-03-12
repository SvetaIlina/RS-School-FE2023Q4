import BaseComponent from '../util/baseComponent';

export default class PageView extends BaseComponent {
    constructor(className: string = '') {
        super({ tag: 'section', classes: [`${className}`], textContent: '' });
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
