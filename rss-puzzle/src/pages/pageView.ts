import BaseComponent from '../util/baseComponent';

export default class PageView {
    viewPage: BaseComponent;

    constructor() {
        this.viewPage = new BaseComponent({
            tag: 'section',
            classes: [''],
            textContent: '',
        });
    }

    getHTMLElement() {
        return this.viewPage.getElement();
    }

    setContent() {
        document.body.append(this.viewPage.getElement());
    }

    replaceCont(newCont: HTMLElement) {
        this.delete();
        document.body.append(newCont);
    }

    delete() {
        this.viewPage.getElement().remove();
    }
}
