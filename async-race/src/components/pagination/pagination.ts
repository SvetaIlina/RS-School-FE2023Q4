import { isNotNull } from '../../servise/servise';
import BaseComponent from '../baseComponent';
import Button from '../buttons/button';
import GargeView from '../main/garage/garage';
import './pagination.css';

export default class Pagination extends BaseComponent {
    private observer: GargeView | null;

    private prevBtn = new Button(['paginationBtn', 'btn', 'disable'], 'Prev', () => this.prevBtnCb());

    private nextBtn = new Button(['paginationBtn', 'btn'], 'next', () => this.nextBtnCb());

    private page = new BaseComponent({
        tag: 'span',
        classes: ['paginationPage'],
        textContent: `1`,
    });

    private totalPage: number = 0;

    currentPageNumber: number;

    constructor() {
        super({
            tag: 'div',
            classes: ['hidden', 'pagination'],
        });
        this.observer = null;
        this.currentPageNumber = 1;
        this.addChild([this.prevBtn, this.page, this.nextBtn]);
    }

    addObserver(observer: GargeView) {
        this.observer = observer;
    }

    configView() {
        if (this.currentPageNumber > 1) {
            this.prevBtn.element.classList.remove('disable');
        } else this.prevBtn.element.classList.add('disable');
        if (this.currentPageNumber === this.totalPage) {
            this.nextBtn.element.classList.add('disable');
        } else this.nextBtn.element.classList.remove('disable');
        this.page.setTextContent(`${this.currentPageNumber}`);
    }

    nextBtnCb() {
        isNotNull(this.observer);
        this.observer.updateContent(this.currentPageNumber + 1);
        this.currentPageNumber += 1;
        this.page.setTextContent(`${this.currentPageNumber}`);
        this.configView();
    }

    prevBtnCb() {
        isNotNull(this.observer);
        this.observer.updateContent(this.currentPageNumber - 1);
        this.currentPageNumber -= 1;
        this.page.setTextContent(`${this.currentPageNumber}`);
        this.configView();
    }

    setTotalPageCount(count: number) {
        this.totalPage = count;
    }
}
