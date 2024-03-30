import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getInfo, addCar, updateCar, deleteCar } from '../../../rest-api/api';
import { carInfo } from '../../../type/types';
import CarContainerView from './careContainer/carContainer';
import { isNotNull, isNotNullElement } from '../../../servise/servise';
import './garage.css';
import GarageOptions from './garge-options/garageOption';
import Pagination from '../../pagination/pagination';

export default class GargeView extends View {
    private carsInfo: Array<carInfo> | null;

    private carsCount: number;

    private garageOption = new GarageOptions();

    private pagination = new Pagination();

    private pageNumber: number;

    private currentId: number;

    private child: Array<BaseComponent>;

    private pageLimit: number = 7;

    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.carsInfo = null;
        this.carsCount = 0;
        this.currentId = 0;
        this.pageNumber = 1;
        this.child = [];
        this.configView();
        this.view.addChild([this.garageOption, this.pagination]);
        this.garageOption.addObserver(this);
        this.pagination.addObserver(this);
    }

    async configView(pageNumber: number = 1) {
        await this.getCarsInfo(pageNumber);
        const { title, carsWrapper } = this.setContent();
        this.child.push(title);
        this.child.push(carsWrapper);
        this.view.addChild([title, carsWrapper]);
        if (this.carsCount > this.pageLimit) {
            this.pagination.getElement().classList.remove('hidden');
        }
        if (this.carsCount <= this.pageLimit) {
            this.pagination.getElement().classList.add('hidden');
        }
        this.pagination.setTotalPageCount(Math.ceil(this.carsCount / this.pageLimit));
        this.pagination.configView();
    }

    async getCarsInfo(pageNumber: number) {
        try {
            const carsInfofromApi = await getInfo('garage', { page: pageNumber, limit: this.pageLimit });
            this.carsInfo = carsInfofromApi.info;

            isNotNull(carsInfofromApi.carCount);
            this.carsCount = carsInfofromApi.carCount;
        } catch (error) {
            throw new Error(`Error fetching car information:${error}`);
        }
    }

    async addNewCar(car: { name: string; color: string }) {
        try {
            await addCar(car);
            this.garageOption.resetInputSettings('new');
            this.updateContent(this.pageNumber);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Something went wrong: ${error.message}`);
            }
        }
    }

    async removeCar(id: number) {
        const carsParent = document.querySelector('.carsWrapper');
        isNotNullElement<HTMLElement>(carsParent);
        const cars = carsParent.childNodes;
        if (cars.length === 1) {
            this.pageNumber -= 1;
            this.pagination.currentPageNumber -= 1;
        }
        try {
            await deleteCar(id);
            this.updateContent(this.pageNumber);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Deleting car:${error.message}`);
            }
        }
    }

    async editCar(name: string, color: string) {
        try {
            await updateCar({ name, color }, this.currentId);
            this.garageOption.resetInputSettings('edit');
            this.garageOption.toggleInputsAccessibility();
            this.updateContent(this.pageNumber);
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
        title.getElement().innerHTML = `Garage (<span class = 'carsCount'>${this.carsCount}</span>)`;

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

    updateContent(newPageNumber: number) {
        this.pageNumber = newPageNumber;
        this.child.forEach((child) => child.getElement().remove());
        this.configView(newPageNumber);
    }
}
