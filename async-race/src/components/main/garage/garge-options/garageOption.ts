import InputOptions from '../../../input/inputOptions';
import Button from '../../../buttons/button';
import BaseComponent from '../../../baseComponent';
import './garageOption.css';
import { isNotNull } from '../../../../servise/servise';
import GargeView from '../garage';

export default class GarageOptions extends BaseComponent {
    private observer: GargeView | null;

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

    constructor() {
        super({
            tag: 'div',
            classes: ['garageOption'],
        });

        this.observer = null;
        this.configView();
    }

    addObserver(observer: GargeView) {
        this.observer = observer;
    }

    configView() {
        const createCarBtn = new Button(['btn'], 'Create', () => this.handleNewCarCreation());
        const updataCarBtn = new Button(['btn'], 'Update', () => this.handleCarEditing());
        const generateRandomCar = new Button(['btn'], 'Generate Cars', () => {
            isNotNull(this.observer);
            this.observer.generateRandomCars();
        });
        this.newCarOption.addChild([this.newCarInput, createCarBtn]);
        this.editCarOption.addChild([this.editCarInput, updataCarBtn]);
        this.addChild([this.newCarOption, this.editCarOption, generateRandomCar]);
    }

    handleNewCarCreation() {
        isNotNull(this.observer);
        const carName: string = this.newCarInput.getText();
        const carColor: string = this.newCarInput.getColor();
        this.observer.addNewCar({ name: carName, color: carColor });
    }

    handleCarEditing() {
        isNotNull(this.observer);
        const newName = this.editCarInput.getText();
        const newColor = this.editCarInput.getColor();
        this.observer.editCar({ name: newName, color: newColor });
    }

    setEditableValue(name: string, color: string) {
        this.editCarInput.setText(name);
        this.editCarInput.setColor(color);
    }

    toggleInputsAccessibility() {
        this.editCarOption.getElement().classList.toggle('disable');
    }

    resetInputSettings(inputName: string) {
        if (inputName === 'new') {
            this.newCarInput.reset();
        }
        if (inputName === 'edit') {
            this.editCarInput.reset();
        }
    }
}
