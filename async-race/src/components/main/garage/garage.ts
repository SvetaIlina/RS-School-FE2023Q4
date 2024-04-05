import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getCars, addCar, updateCar, deleteCar, addWinner } from '../../../rest-api/api';
import { CarsResponse, carData, carInfo, mainContent, winnerData } from '../../../type/types';
import CarContainer from './careContainer/carContainer';
import {
    dispatchBtnEvent,
    getActiveBtns,
    getRandomCarInfo,
    isNotNull,
    isNotNullElement,
} from '../../../servise/servise';
import './garage.css';
import GarageOptions from './garge-options/garageOption';
import RaceOptions from './race-options/raceOption';
import Modal from '../../modal/modalWindow';

export default class GargeView extends View {
    private carsInfo: Array<carInfo> | null;

    private garageOption = new GarageOptions();

    private pageNumber: number;

    private currentId: number;

    private child: Array<BaseComponent>;

    private cars: Array<CarContainer>;

    constructor() {
        super({
            tag: 'div',
            classes: ['garage'],
        });
        this.cars = [];
        this.carsInfo = null;
        this.pageLimit = 7;
        this.currentId = 0;
        this.pageNumber = 1;
        this.child = [];
        this.elementCount = 0;
        this.view.addChild([this.garageOption]);
        this.garageOption.addObserver(this);
        this.configView();
    }

    async configView(pageNumber: number = 1): Promise<void> {
        try {
            await this.getCarsInfo(pageNumber);
            const { title, carsWrapper } = this.setContent();
            const raceOptions = new RaceOptions();
            raceOptions.addObserver(this);
            this.addPagination(this, pageNumber);
            this.child.push(title);
            this.child.push(carsWrapper);
            this.child.push(raceOptions);
            this.view.addChild([raceOptions, title, carsWrapper]);
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    }

    async getCarsInfo(pageNumber: number): Promise<void> {
        try {
            const carsInfofromApi: CarsResponse = await getCars({ page: pageNumber, limit: this.pageLimit });
            this.carsInfo = carsInfofromApi.info;

            isNotNull(carsInfofromApi.membersCount);
            this.elementCount = carsInfofromApi.membersCount;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`fetching cars information: ${error.message}`);
            }
        }
    }

    async addNewCar(car: carData): Promise<void> {
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

    async removeCar(id: number): Promise<void> {
        const carsParent: Element | null = document.querySelector('.carsWrapper');
        isNotNullElement<HTMLElement>(carsParent);
        const cars: NodeListOf<ChildNode> = carsParent.childNodes;
        if (cars.length === 1) {
            this.pageNumber -= 1;
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

    async editCar(car: carData): Promise<void> {
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

    async startRace(): Promise<void> {
        const btnsForDisable: Array<Element> = getActiveBtns();
        btnsForDisable.forEach((btn: Element) => btn.classList.add('disable'));

        const promises: Array<Promise<winnerData>> = [];
        this.cars.forEach((car: CarContainer) => {
            promises.push(car.moveCar());
        });

        Promise.any(promises)
            .then(async (result: winnerData) => {
                new Modal().buildModal(result.name, result.time);
                await addWinner({ id: result.id, wins: 1, time: +result.time });
            })
            .catch((error) => console.log(error));

        await Promise.allSettled(promises);
        btnsForDisable.forEach((btn: Element) => btn.classList.remove('disable'));
    }

    async resetRace(): Promise<void> {
        this.cars.forEach((car: CarContainer) => {
            dispatchBtnEvent(car, 'stopBtn ');
        });
    }

    async generateRandomCars(): Promise<void> {
        const addedPromises: Array<Promise<carInfo>> = [];
        for (let i = 0; i < 100; i += 1) {
            const data: carData = getRandomCarInfo();
            const promise: Promise<carInfo> = addCar(data);
            addedPromises.push(promise);
        }
        await Promise.all(addedPromises);
        this.updateContent(this.pageNumber);
    }

    setCarInfo(car: carData, id: number): void {
        this.garageOption.toggleInputsAccessibility();
        this.garageOption.setEditableValue(car.name, car.color);
        this.currentId = id;
    }

    setContent(): mainContent {
        const cars: Array<carInfo> | null = this.carsInfo;
        isNotNull(cars);

        const title = new BaseComponent({
            tag: 'div',
            classes: ['title'],
        });
        title.getElement().innerHTML = `Garage (<span class = 'carsCount'>${this.elementCount}</span>)`;

        const carsWrapper = new BaseComponent({
            tag: 'div',
            classes: ['carsWrapper'],
        });

        cars.forEach((car: carInfo) => {
            const { color, name, id } = car;
            const container = new CarContainer(color, name, id);
            container.addObserver(this);
            carsWrapper.addChild([container.getElement()]);
            this.cars.push(container);
        });

        return { title, carsWrapper };
    }

    updateContent(newPageNumber: number): void {
        this.cars = [];
        this.pageNumber = newPageNumber;
        this.child.forEach((child) => child.getElement().remove());
        this.configView(newPageNumber);
    }
}
