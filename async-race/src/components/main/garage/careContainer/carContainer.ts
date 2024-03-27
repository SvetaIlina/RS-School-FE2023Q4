import View from '../../../view';
import CarOptions from '../../../carsElements/car-options/carOptions';
import Car from '../../../carsElements/car/car';
import './carContainer.css';

import { isNotNull } from '../../../../servise/servise';

import BaseComponent from '../../../baseComponent';
import img from '../../../../assets/images/finish.png';
import GargeView from '../garage';

export default class CarContainerView extends View {
    private observer: GargeView | null;

    private id: number;

    private carName: string;

    private carColor: string;

    constructor(carColor: string, carName: string, carId: number) {
        super({
            tag: 'div',
            classes: ['carContainer'],
        });
        this.id = carId;
        this.carName = carName;
        this.carColor = carColor;
        this.observer = null;

        this.configView(this.carColor, this.carName, this.id);
    }

    addObserver(observer: GargeView) {
        this.observer = observer;
    }

    configView(carColor: string, carName: string, id: number) {
        const image = new BaseComponent({
            tag: 'img',
            classes: ['imgFinish'],
            attributes: [{ key: 'src', value: img }],
        });
        const deleteCb = () => {
            isNotNull(this.observer);
            this.observer.removeCar(id);
        };
        const editCb = () => {
            isNotNull(this.observer);
            this.observer.setCarInfo(carName, carColor, id);
        };
        const car = new Car(carColor);
        const options = new CarOptions(carName, deleteCb, editCb);
        this.view.addChild([options.getViewElement(), car, image]);
    }
}
