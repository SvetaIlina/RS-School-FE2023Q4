import InputOptions from '../../../input/inputOptions';
import Button from '../../../buttons/button';
import BaseComponent from '../../../baseComponent';
import { addNewCar, updateCar } from '../../../../rest-api/api';
import CarContainerView from '../careContainer/carContainer';
import './garageOption.css';
import { isNotNull } from '../../../../servise/servise';

export default class GarageOptions extends BaseComponent {
    private newCarInput: InputOptions = new InputOptions();

    private editCarInput: InputOptions = new InputOptions();

    private newCarOption = new BaseComponent({
        tag: 'div',
        classes: ['option', 'newCarOption'],
    });

    private editCarOption = new BaseComponent({
        tag: 'div',
        classes: ['option', 'editCarOption', 'disable'],
    });

    private carsWrapper: BaseComponent;

    id: number;

    currentCarConteiner: CarContainerView | null;

    constructor(carsWrapper: BaseComponent) {
        super({
            tag: 'div',
            classes: ['garageOption'],
        });
        this.carsWrapper = carsWrapper;
        this.id = 0;
        this.currentCarConteiner = null;
        this.configView();
    }

    configView() {
        const createCarBtn = new Button(['btn'], 'Create', () => this.createNewCar(this.carsWrapper));
        const updataCarBtn = new Button(['btn'], 'Update', () => this.editCar());
        this.newCarOption.addChild([this.newCarInput, createCarBtn]);
        this.editCarOption.addChild([this.editCarInput, updataCarBtn]);
        this.addChild([this.newCarOption, this.editCarOption]);
    }

    async createNewCar(parent: BaseComponent) {
        const carName: string = this.newCarInput.getText();
        const carColor: string = this.newCarInput.getColor();
        try {
            const carInfo = await addNewCar({ name: carName, color: carColor });
            const carId = carInfo.id;
            const newCar = new CarContainerView(carColor, carName, carId, this);
            parent.addChild([newCar.getViewElement()]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Something went wrong: ${error.message}`);
            }
        }
    }

    async editCar() {
        const newName = this.editCarInput.getText();
        const newColor = this.editCarInput.getColor();
        const { id } = this;
        try {
            const carInfo = await updateCar(
                {
                    name: newName,
                    color: newColor,
                },
                id
            );
            isNotNull(this.currentCarConteiner);
            this.currentCarConteiner.view.removeChild();
            this.currentCarConteiner.configView(carInfo.color, carInfo.name, carInfo.id);
            this.editCarInput.setText('');
            this.editCarInput.setColor('#000');
            this.editCarOption.getElement().classList.add('disable');
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Editing car:${error.message}`);
            }
        }
    }

    setCarInfo(carName: string, carColor: string, id: number, carContainer: CarContainerView) {
        this.editCarOption.getElement().classList.remove('disable');
        this.editCarInput.setText(carName);
        this.editCarInput.setColor(carColor);
        this.id = id;
        this.currentCarConteiner = carContainer;
    }
}
