import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getInfo } from '../../../rest-api/api';
import { carInfo } from '../../../type/types';
import CarContainerView from './careContainer/carContainer';
import { isNotNull } from '../../../servise/servise';
import './garage.css';
import GarageOptions from './garge-options/garageOption';

export default class GargeView extends View {
    private carInfo: Array<carInfo> | null;

    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.carInfo = null;
        this.initialize();
    }

    async initialize() {
        await this.getCarInfo();
        this.configView();
    }

    configView() {
        const cars = this.carInfo;
        isNotNull(cars);
        const title = new BaseComponent({
            tag: 'div',
            classes: ['title'],
        });
        title.getElement().innerHTML = `Garage (<span class = 'carsCount'>${cars.length}</span>)`;
        const pageNumber = new BaseComponent({
            tag: 'span',
            classes: ['pageNumber'],
            textContent: `Page 1`,
        });
        const carsWrapper = new BaseComponent({
            tag: 'div',
            classes: ['carsWrapper'],
        });
        const garageOption = new GarageOptions(carsWrapper);

        cars.forEach((car) => {
            const { color, name, id } = car;
            const container = new CarContainerView(color, name, id, garageOption);
            carsWrapper.addChild([container.getViewElement()]);
        });

        this.view.addChild([garageOption, title, pageNumber, carsWrapper]);
    }

    async getCarInfo() {
        try {
            const carInfofromApi = await getInfo('garage');
            this.carInfo = carInfofromApi;
        } catch (error) {
            throw new Error(`Error fetching car information:${error}`);
        }
    }
}
