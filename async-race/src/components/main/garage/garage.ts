import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getInfo, addCar, updateCar, deleteCar } from '../../../rest-api/api';
import { carInfo } from '../../../type/types';
import CarContainerView from './careContainer/carContainer';
import { isNotNull } from '../../../servise/servise';
import './garage.css';
import GarageOptions from './garge-options/garageOption';

export default class GargeView extends View {
    private carsInfo: Array<carInfo> | null;

    private garageOption = new GarageOptions();

    private currentId: number;

    private child: Array<BaseComponent>;

    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.carsInfo = null;
        this.currentId = 0;
        this.child = [];
        this.configView();
        this.garageOption.addObserver(this);
    }

    async configView() {
        await this.getCarsInfo();
        const { title, carsWrapper } = this.setContent();
        this.child.push(title);
        this.child.push(carsWrapper);
        this.view.addChild([this.garageOption, title, carsWrapper]);
    }

    async getCarsInfo() {
        try {
            const carsInfofromApi = await getInfo('garage');
            this.carsInfo = carsInfofromApi;
        } catch (error) {
            throw new Error(`Error fetching car information:${error}`);
        }
    }

    async addNewCar(car: { name: string; color: string }) {
        try {
            await addCar(car);
            this.updateContent();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Something went wrong: ${error.message}`);
            }
        }
    }

    async removeCar(id: number) {
        try {
            await deleteCar(id);
            this.updateContent();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Deleting car:${error.message}`);
            }
        }
    }

    async editCar(name: string, color: string) {
        try {
            await updateCar({ name, color }, this.currentId);
            this.garageOption.resetInputSettings();
            this.garageOption.toggleInputsAccessibility();
            this.updateContent();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Editing car:${error.message}`);
            }
        }
    }

    setCarInfo(name: string, color: string, id: number) {
        this.garageOption.toggleInputsAccessibility();
        this.garageOption.setEditableValue(name, color);
        this.currentId = id;
    }

    setContent() {
        const cars = this.carsInfo;
        isNotNull(cars);

        const title = new BaseComponent({
            tag: 'div',
            classes: ['title'],
        });
        title.getElement().innerHTML = `Garage (<span class = 'carsCount'>${cars.length}</span>)`;

        const carsWrapper = new BaseComponent({
            tag: 'div',
            classes: ['carsWrapper'],
        });

        cars.forEach((car) => {
            const { color, name, id } = car;
            const container = new CarContainerView(color, name, id);
            container.addObserver(this);
            carsWrapper.addChild([container.getViewElement()]);
        });

        return { title, carsWrapper };
    }

    updateContent() {
        this.child.forEach((child) => child.getElement().remove());
        this.configView();
    }
}
