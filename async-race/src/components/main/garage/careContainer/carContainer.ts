import CarOptions from './carElement/car-options/carOptions';
import Car from './carElement/car/car';
import './carContainer.css';
import { startStopEngine, switchToDriveMode } from '../../../../rest-api/api';
import { isNotNull, toggleBtn } from '../../../../servise/servise';

import BaseComponent from '../../../baseComponent';
import img from '../../../../assets/images/finish.png';
import GargeView from '../garage';
import { winnerData } from '../../../../type/types';

export default class CarContainer extends BaseComponent {
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

    addObserver(observer: GargeView): void {
        this.observer = observer;
    }

    configView(carColor: string, carName: string, id: number): void {
        const finishImage = new BaseComponent({
            tag: 'img',
            classes: ['imgFinish'],
            attributes: [{ key: 'src', value: img }],
        });
        const deleteCb: () => void = () => {
            isNotNull(this.observer);
            this.observer.removeCar(id);
        };
        const editCb: () => void = () => {
            isNotNull(this.observer);
            this.observer.setCarInfo({ name: carName, color: carColor }, id);
        };
        this.car = new Car(carColor);

        const options = new CarOptions(
            carName,
            deleteCb,
            editCb,
            (e) => {
                isNotNull(e.target);
                toggleBtn(e.target);
                this.moveCar().catch((error) => console.error(error.message));
            },
            (e) => {
                isNotNull(e.target);
                toggleBtn(e.target);
                this.stopCar();
            }
        );
        this.addChild([options.getElement(), this.car, finishImage]);
    }

    async moveCar(): Promise<winnerData> {
        isNotNull(this.car);
        try {
            const distanecForCar: number = this.getCarDistance();
            const { velocity, distance } = await startStopEngine(this.id, 'started');
            const duration: number = distance / velocity;
            this.car.setAnimation(duration, distanecForCar);
            await switchToDriveMode(this.id, 'drive');
            return { name: this.carName, color: this.carColor, id: this.id, time: `${(duration / 1000).toFixed(2)}` };
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
            this.car.setBreakageAnimation();
            throw error;
        }
    }

    async stopCar(): Promise<void> {
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

    getCarDistance(): number {
        const container: HTMLElement = this.getElement();
        const computedStyle: CSSStyleDeclaration = window.getComputedStyle(container);
        const carsWidth: number = 80;
        const paddings: number = 20;
        const distanecForCar: number = parseInt(computedStyle.getPropertyValue('width'), 10) - carsWidth - paddings;
        return distanecForCar;
    }
}
