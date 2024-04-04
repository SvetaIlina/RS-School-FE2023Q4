import WinnersView from './winners/winners';
import GargeView from './garage/garage';
import BaseComponent from '../baseComponent';
import { mainsChild } from '../../type/types';

export default class MainElement extends BaseComponent {
    private child: Array<mainsChild>;

    private garage = new GargeView();

    private winners = new WinnersView();

    constructor() {
        super({
            tag: 'main',
            classes: ['main'],
        });
        this.child = [this.garage, this.winners];
        this.configView();
    }

    configView(): void {
        const wrapper: BaseComponent = new BaseComponent({
            tag: 'div',
            classes: ['wrapper'],
        });

        wrapper.addChild([this.garage.getViewElement(), this.winners.getViewElement()]);
        this.addChild([wrapper]);
    }

    getChild(): Array<mainsChild> {
        return this.child;
    }
}
