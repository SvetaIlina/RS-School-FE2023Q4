import BaseComponent from '../components/baseComponent';
import MainView from '../view';
import './page.css';

export default class BasePage extends BaseComponent {
    private observers: MainView[] = [];

    constructor() {
        super({
            tag: 'div',
            classes: ['page'],
        });
    }

    subscribe(observer: MainView) {
        this.observers.push(observer);
    }

    protected notifyObservers(action: string) {
        this.observers.forEach((observer) => {
            observer.update(action);
        });
    }

    getPageElement() {
        return this.getElement();
    }
}
