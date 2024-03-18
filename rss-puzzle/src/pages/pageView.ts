import BaseComponent from '../util/baseComponent';

export default class PageView {
    viewPage: BaseComponent;

    constructor(cssClass: Array<string>) {
        this.viewPage = new BaseComponent({
            tag: 'section',
            classes: cssClass,
            textContent: '',
        });
    }

    getHTMLElement() {
        return this.viewPage.getElement();
    }

    setContent() {
        document.body.append(this.viewPage.getElement());
    }
}
