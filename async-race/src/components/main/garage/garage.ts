import BaseComponent from '../../baseComponent';
import View from '../../view';
import getInfo from '../../../rest-api/api';

export default class GargeView extends View {
    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.configView();
    }

    async configView() {
        const cars = await getInfo('garage', {
            page: 1,
            limit: 4,
        });
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['title'],
            textContent: `Garage (${cars.length})`,
        });
        const currentPage = new BaseComponent({
            tag: 'span',
            classes: ['pageNumber'],
            textContent: `Page 1`,
        });
        this.view.addChild([title, currentPage]);
    }
}
