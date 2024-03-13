import BaseComponent from '../../util/baseComponent';
import { Callback } from '../../util/type';
import './button.css';

export default class Button extends BaseComponent {
    constructor(text: string, btnCallback: Callback<Event>, classCss: string = '') {
        super({
            tag: 'button',
            classes: [`${classCss}`, 'btn'],
            textContent: `${text}`,
            callback: btnCallback,
        });
    }
}
