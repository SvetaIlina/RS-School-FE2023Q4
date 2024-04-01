import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getInfo, addCar, updateCar, deleteCar, addWinner } from '../../../rest-api/api';
import { carData, carInfo, winnerResponse } from '../../../type/types';
import CarContainerView from './careContainer/carContainer';
import {
    dispatchBtnEvent,
    getActiveBtns,
    getRandomCarInfo,
    isNotNull,
    isNotNullElement,
} from '../../../servise/servise';
import './garage.css';
import GarageOptions from './garge-options/garageOption';
import Pagination from '../../pagination/pagination';
import RaceOptions from './race-options/raceOption';
import Modal from '../../modal/modalWindow';

export default class GargeView extends View {
    private carsInfo: Array<carInfo> | null;

    private carsCount: number;

    private garageOption = new GarageOptions();

    private pagination = new Pagination();

    private pageNumber: number;

    private currentId: number;

    private child: Array<BaseComponent>;

    private pageLimit: number = 7;

    private cars: Array<CarContainerView>;

    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.cars = [];
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
        try {
            await this.getCarsInfo(pageNumber);
            const { title, carsWrapper } = this.setContent();
            const raceOptions = new RaceOptions();
            raceOptions.addObserver(this);
            this.child.push(title);
            this.child.push(carsWrapper);
            this.child.push(raceOptions);
            this.view.addChild([raceOptions, title, carsWrapper]);
            if (this.carsCount > this.pageLimit) {
                this.pagination.getElement().classList.remove('hidden');
            }
            if (this.carsCount <= this.pageLimit) {
                this.pagination.getElement().classList.add('hidden');
            }
            this.pagination.setTotalPageCount(Math.ceil(this.carsCount / this.pageLimit));
            this.pagination.configView();
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }

    async getCarsInfo(pageNumber: number) {
        try {
            const carsInfofromApi = await getInfo('garage', { page: pageNumber, limit: this.pageLimit });
            this.carsInfo = carsInfofromApi.info;

            isNotNull(carsInfofromApi.carCount);
            this.carsCount = carsInfofromApi.carCount;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`fetching cars information: ${error.message}`);
            }
        }
    }

    async addNewCar(car: carData) {
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

    async editCar(car: carData) {
        try {
            await updateCar(car, this.currentId);
            this.garageOption.resetInputSettings('edit');
            this.garageOption.toggleInputsAccessibility();
            this.updateContent(this.pageNumber);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Editing car:${error.message}`);
            }
        }
    }

    async startRace() {
        const btnsForDisable = getActiveBtns();
        btnsForDisable.forEach((btn) => btn.classList.add('disable'));

        const promises: Array<Promise<winnerResponse>> = [];
        this.cars.forEach((car) => {
            promises.push(car.moveCar());
        });

        Promise.any(promises)
            .then(async (result) => {
                new Modal().buildModal(result.name, result.time);
                await addWinner({ id: result.id, wins: 1, time: +result.time });
            })
            .catch((error) => console.log(error));

        await Promise.allSettled(promises);
        btnsForDisable.forEach((btn) => btn.classList.remove('disable'));
    }

    async resetRace() {
        this.cars.forEach((car) => {
            dispatchBtnEvent(car, 'stopBtn ');
        });
    }

    async generateRandomCars() {
        const addingPromises = [];
        for (let i = 0; i < 100; i += 1) {
            const data = getRandomCarInfo();
            const promise = addCar(data);
            addingPromises.push(promise);
        }
        await Promise.all(addingPromises);
        this.updateContent(this.pageNumber);
    }

    setCarInfo(car: carData, id: number) {
        this.garageOption.toggleInputsAccessibility();
        this.garageOption.setEditableValue(car.name, car.color);
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
            this.cars.push(container);
        });

        return { title, carsWrapper };
    }

    updateContent(newPageNumber: number) {
        this.cars = [];
        this.pageNumber = newPageNumber;
        this.child.forEach((child) => child.getElement().remove());
        this.configView(newPageNumber);
    }
}
