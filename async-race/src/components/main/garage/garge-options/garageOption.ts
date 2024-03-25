import InputOptions from '../../../input/inputOptions';
import Button from '../../../buttons/button';
import BaseComponent from '../../../baseComponent';
import { addNewCar } from '../../../../rest-api/api';
import CarContainerView from '../careContainer/carContainer';
import './garageOption.css';

export default class GarageOptions extends BaseComponent {
    private newCarInput: InputOptions = new InputOptions();

    private editCarInput: InputOptions = new InputOptions();

    carsWrapper: BaseComponent;

    constructor(carsWrapper: BaseComponent) {
        super({
            tag: 'div',
            classes: ['garageOption'],
        });
        this.carsWrapper = carsWrapper;
        this.configView();
    }

    configView() {
        const newCarOption = new BaseComponent({
            tag: 'div',
            classes: ['option', 'newCarOption'],
        });
        const editCarOption = new BaseComponent({
            tag: 'div',
            classes: ['option', 'editCarOption', 'disable'],
        });

        const createCarBtn = new Button(['btn'], 'Create', () => this.createNewCar());
        const updataCarBtn = new Button(['btn'], 'Update', () => console.log('updataCar'));
        newCarOption.addChild([this.newCarInput, createCarBtn]);
        editCarOption.addChild([this.editCarInput, updataCarBtn]);
        this.addChild([newCarOption, editCarOption]);
    }

    async createNewCar() {
        const carName: string = this.newCarInput.getText();
        const carColor: string = this.newCarInput.getColor();
        try {
            const carInfo = await addNewCar({ name: carName, color: carColor });
            const carId = carInfo.id;
            const newCar = new CarContainerView(carColor, carName, carId);
            this.carsWrapper.addChild([newCar.getViewElement()]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Something went wrong: ${error.message}`);
            }
        }
    }
}
