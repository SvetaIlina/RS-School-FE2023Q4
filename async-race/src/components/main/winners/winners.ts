import BaseComponent from '../../baseComponent';
import View from '../../view';
import getInfo from '../../../rest-api/api';

export default class WinnersView extends View {
    constructor() {
        super({
            tag: 'div',
            classes: ['winners', 'hidden'],
        });
        this.configView();
    }

    async configView() {
        const winners = await getInfo('winners');
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['title'],
            textContent: `Winners (${winners.length})`,
        });
        const currentPage = new BaseComponent({
            tag: 'span',
            classes: ['pageNumber'],
            textContent: `Page 1`,
        });
        this.view.addChild([title, currentPage]);
    }
}
