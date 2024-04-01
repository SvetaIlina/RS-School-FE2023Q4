import View from '../view';
import WinnersView from './winners/winners';
import GargeView from './garage/garage';
import BaseComponent from '../baseComponent';

export default class MainView extends View {
    private child: [GargeView, WinnersView];

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

    configView() {
        const wrapper = new BaseComponent({
            tag: 'div',
            classes: ['wrapper'],
        });

        wrapper.addChild([this.garage.getViewElement(), this.winners.getViewElement()]);
        this.view.addChild([wrapper]);
    }

    getChild() {
        return this.child;
    }
}
