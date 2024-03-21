import BaseComponent from '../baseComponent';
import { Callback } from '../../type/types';
import './btn.css';

export default class Button<T = undefined> extends BaseComponent {
    constructor(btnClasses: Array<string>, btnText: string, btnCallback: Callback<T>, arg: T) {
        super({
            tag: 'button',
            classes: btnClasses,
            textContent: btnText,
            onClick: (event) => {
                event.preventDefault();
                btnCallback(arg);
            },
            eventType: 'click',
        });
    }
}
