import BaseComponent from '../components/baseComponent';
import Controller from '../app/controller';

import './page.css';

export default abstract class BasePage extends BaseComponent {
    private observers: Controller[] = [];

    constructor() {
        super({
            tag: 'main',
            classes: ['main'],
        });
    }

    subscribe(observer: Controller) {
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
