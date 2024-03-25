import View from '../../../view';
import CarOptions from '../../../carsElements/car-options/carOptions';
import Car from '../../../carsElements/car/car';
import './carContainer.css';
import { deleteCar } from '../../../../rest-api/api';
import { isNotNullHTMLElement } from '../../../../servise/servise';
import GarageOptions from '../garge-options/garageOption';

export default class CarContainerView extends View {
    id: number;

    carName: string;

    carColor: string;

    editManger: GarageOptions;

    constructor(carColor: string, carName: string, carId: number, editManger: GarageOptions) {
        super({
            tag: 'div',
            classes: ['carContainer'],
        });
        this.id = carId;
        this.carName = carName;
        this.carColor = carColor;
        this.editManger = editManger;
        this.view.setAttributes([
            {
                key: 'id',
                value: `car${this.id}`,
            },
        ]);
        this.configView(this.carColor, this.carName, this.id);
    }

    configView(carColor: string, carName: string, id: number) {
        const deleteCb = async () => {
            await this.deleteThisCar(id);
        };
        const editCb = () => this.editManger.setCarInfo(carName, carColor, id, this);
        const car = new Car(carColor);
        const options = new CarOptions(carName, deleteCb, editCb);
        this.view.addChild([options.getViewElement(), car]);
    }

    // startEngine ()
    // stopEngine ()
    async deleteThisCar(id: number) {
        try {
            await deleteCar(id);
            const carCount = document.querySelector('.carsCount');
            isNotNullHTMLElement<HTMLElement>(carCount);
            const currentCount = +carCount.innerText;
            carCount.innerText = `${currentCount - 1}`;
            this.view.getElement().remove();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Deleting car:${error.message}`);
            }
        }
    }
}
