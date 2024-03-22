import View from '../../../view';

import Car from '../../../carsElements/car/car';

export default class CarContainerView extends View {
    constructor(carColor: string) {
        super({
            tag: 'div',
            classes: ['carContainer'],
        });
        this.configView(carColor);
    }

    configView(carColor: string) {
        const car = new Car(carColor);
        this.view.addChild([car]);
    }
}
