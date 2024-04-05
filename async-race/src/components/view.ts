import BaseComponent from './baseComponent';
import { elemOptions, mainsChild } from '../type/types';
import Pagination from './pagination/pagination';
import { isNotNull } from '../servise/servise';

export default class View {
    view: BaseComponent;

    private pagination = new Pagination();

    pageLimit: number;

    elementCount: number | null;

    constructor(options: Pick<elemOptions, 'tag' | 'classes'>) {
        this.view = new BaseComponent({
            tag: options.tag,
            classes: options.classes,
            textContent: '',
        });
        this.elementCount = 0;
        this.pageLimit = 0;
    }

    addPagination(observer: mainsChild, page: number): void {
        this.pagination.addObserver(observer);
        this.pagination.currentPageNumber = page;
        isNotNull(this.elementCount);
        this.pagination.setTotalPageCount(Math.ceil(this.elementCount / this.pageLimit));
        this.pagination.configView();
        this.view.getElement().insertAdjacentElement('afterbegin', this.pagination.getElement());
    }

    getViewElement(): HTMLElement {
        return this.view.getElement();
    }
}
