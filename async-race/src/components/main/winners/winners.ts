import BaseComponent from '../../baseComponent';
import View from '../../view';
import { getCar, getAllWinners } from '../../../rest-api/api';
import TableBuilder from './winnersTable/table';
import { carInfo, winnerCar } from '../../../type/types';
import { isNotNull } from '../../../servise/servise';
import carImg from '../../../assets/images/1299198.svg';
import './winners.css';

export default class WinnersView extends View {
    private pageNumber: number;

    private pageLimit: number;

    private winsCount: number | null;

    private winInfo: Array<winnerCar>;

    constructor() {
        super({
            tag: 'div',
            classes: ['winners', 'hidden'],
        });

        this.winInfo = [];
        this.pageNumber = 1;
        this.pageLimit = 7;
        this.winsCount = 0;
        this.configView();
    }

    async configView(pageNumber: number = 1) {
        try {
            await this.getWinsInfo(pageNumber);

            const title = new BaseComponent({
                tag: 'p',
                classes: ['title'],
                textContent: `Winners (${this.winsCount})`,
            });
            this.view.removeChild();
            this.view.addChild([title, this.addCarInTable()]);
        } catch (error) {
            if (error instanceof Error) console.error(`Error fetching winners information:${error.message}`);
        }
    }

    async getWinsInfo(pageNumber: number) {
        try {
            const winsInfofromApi = await getAllWinners({ page: pageNumber, limit: this.pageLimit });

            this.winInfo = winsInfofromApi.info;

            isNotNull(this.winsCount);
            this.winsCount = winsInfofromApi.membersCount;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`fetching cars information: ${error.message}`);
            }
        }
    }

    addCarInTable() {
        const table = new TableBuilder();

        this.winInfo.forEach(async (winner, i) => {
            let carNumber = i;
            const car: carInfo = await getCar(winner.id);

            const carImage = new BaseComponent<HTMLImageElement>({
                tag: 'img',
                classes: ['winCarImg'],
            });
            carImage.getElement().style.background = `url(${carImg})`;
            table.addRow([
                `${(carNumber += 1)}`,
                carImage.getElement(),
                `${car.name}`,
                `${this.winInfo[i].wins}`,
                `${this.winInfo[i].time}`,
            ]);
        });
        table.getTable().classList.add('wintable');
        return table.getTable();
    }
}
