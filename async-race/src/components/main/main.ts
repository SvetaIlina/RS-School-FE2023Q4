import View from '../view';
import WinnersView from './winners/winners';
import GargeView from './garage/garage';
import BaseComponent from '../baseComponent';

export default class MainView extends View {
    private child: Array<HTMLElement>;

    constructor() {
        super({
            tag: 'main',
            classes: ['main'],
        });
        this.child = [];
        this.configView();
    }

    configView() {
        const wrapper = new BaseComponent({
            tag: 'div',
            classes: ['wrapper'],
        });
        const garage = new GargeView().getViewElement();
        const winners = new WinnersView().getViewElement();
        this.child.push(garage);
        this.child.push(winners);
        wrapper.addChild([garage, winners]);
        this.view.addChild([wrapper]);
    }

    getChild() {
        return this.child;
    }
}
