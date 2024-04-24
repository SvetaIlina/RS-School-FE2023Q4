import { Callback } from '../../type/type';
import BaseComponent from '../baseComponent';
import './btn.css';

export default class Button extends BaseComponent {
    constructor(btnClasses: Array<string>, btnText: string, btnCallback: Callback<Event>, btnType?: string) {
        super({
            tag: 'button',
            classes: btnClasses,
            textContent: btnText,
        });
        this.setCallback(btnCallback, 'click');
        this.setStyles(['btn']);
        if (btnType) {
            this.setAttributes([{ key: 'type', value: `${btnType}` }]);
        }
    }
}
