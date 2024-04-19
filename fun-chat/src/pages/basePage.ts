import BaseComponent from '../components/baseComponent';
import Controller from '../controller';
import MainView from '../view';
import './page.css';

export default class BasePage extends BaseComponent {
    private observers: Array<MainView | Controller> = [];

    constructor() {
        super({
            tag: 'div',
            classes: ['page'],
        });
    }

    subscribe(observer: MainView | Controller) {
        this.observers.push(observer);
    }

    protected notifyObservers(action: string, data?: string) {
        this.observers.forEach((observer) => {
            observer.update(action, data);
        });
    }

    getPageElement() {
        return this.getElement();
    }
}
