import BaseComponent from '../../util/baseComponent';
import './button.css';

export default class Button extends BaseComponent {
    constructor(text: string, classCss: string = '') {
        super({
            tag: 'button',
            classes: [`${classCss}`, 'btn'],
            textContent: `${text}`,
        });
    }
}
