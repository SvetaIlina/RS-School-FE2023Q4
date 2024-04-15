import BaseComponent from '../../components/baseComponent';
import BasePage from '../basePage';

export default class NotFound extends BasePage {
    constructor() {
        super();
        this.configView();
    }

    configView() {
        const wrapper = new BaseComponent({
            tag: 'div',
            classes: ['infoWrapper'],
        });
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['infoTitle'],
            textContent: 'Page not Found',
        });

        wrapper.addChild([title]);
        this.addChild([wrapper]);
    }
}
