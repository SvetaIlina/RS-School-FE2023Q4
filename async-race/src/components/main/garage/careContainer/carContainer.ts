import View from '../../../view';
import CarOptions from '../../../carsElements/car-options/carOptions';
import Car from '../../../carsElements/car/car';
import './carContainer.css';
import { startStopEngine, switchToDriveMode } from '../../../../rest-api/api';
import { isNotNull, toggleBtn } from '../../../../servise/servise';

import BaseComponent from '../../../baseComponent';
import img from '../../../../assets/images/finish.png';
import GargeView from '../garage';

export default class CarContainerView extends View {
    private observer: GargeView | null;

    private id: number;

    private carName: string;

    private carColor: string;

    private car: Car | null;

    constructor(carColor: string, carName: string, carId: number) {
        super({
            tag: 'div',
            classes: ['carContainer'],
        });
        this.car = null;
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
        this.car = new Car(carColor);
        const options = new CarOptions(
            carName,
            deleteCb,
            editCb,
            (e) => {
                this.moveCar();
                toggleBtn(e);
            },
            (e) => {
                this.stopCar();
                toggleBtn(e);
            }
        );
        this.view.addChild([options.getViewElement(), this.car, image]);
    }

    async moveCar() {
        isNotNull(this.car);
        const container = this.view.getElement();
        const computedStyle = window.getComputedStyle(container);
        const carsWidth = 160;
        const distanecForCar: number = parseInt(computedStyle.getPropertyValue('width'), 10) - carsWidth;
        try {
            const { velocity, distance } = await startStopEngine(this.id, 'started');
            const duration = distance / velocity;
            this.car.setAnimation(duration, distanecForCar);
            const isSuccess = await switchToDriveMode(this.id, 'drive');
            if (!isSuccess) {
                this.car.setCarsBaloonAnimation();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`${error.message}`);
            }
        }
    }

    async stopCar() {
        try {
            isNotNull(this.car);
            this.car.resetAnimation();
            await startStopEngine(this.id, 'stopped');
            this.car.backToStart();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`${error.message}`);
            }
        }
    }
}
