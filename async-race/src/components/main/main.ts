import View from '../view';
import WinnersView from './winners/winners';
import GargeView from './garage/garage';

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
        const garage = new GargeView().getViewElement();
        const winners = new WinnersView().getViewElement();
        this.child.push(garage);
        this.child.push(winners);
        this.view.addChild([garage, winners]);
    }

    getChild() {
        return this.child;
    }
}
