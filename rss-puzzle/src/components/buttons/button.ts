import BaseComponent from '../../util/baseComponent';
import { Callback } from '../../type/type';
import './button.css';

export default class Button extends BaseComponent {
    constructor(text: string, btnCallback: Callback<Event>, classCss?: Array<string>) {
        super({
            tag: 'button',
            classes: ['btn'],
            textContent: `${text}`,
            callback: btnCallback,
        });
        if (classCss) {
            this.setStyles(classCss);
        }
    }
}
