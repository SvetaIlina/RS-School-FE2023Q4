import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getInfo } from '../../../rest-api/api';

export default class WinnersView extends View {
    constructor() {
        super({
            tag: 'div',
            classes: ['winners', 'hidden'],
        });
        this.configView();
    }

    async configView() {
        const winners = await getInfo('winners', {
            page: 1,
            limit: 1,
        });
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['title'],
            textContent: `Winners ()`,
        });
        const currentPage = new BaseComponent({
            tag: 'span',
            classes: ['pageNumber'],
            textContent: `Page 1`,
        });
        this.view.addChild([title, currentPage]);
    }
}
