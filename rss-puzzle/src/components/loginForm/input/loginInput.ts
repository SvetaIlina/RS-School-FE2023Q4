import BaseComponent from '../../../util/baseComponent';
import { Callback } from '../../../util/type';
import './loginInput.css';

export default class LoginInput extends BaseComponent {
    input: HTMLInputElement;

    label: HTMLElement;

    constructor(labelText: string) {
        super({
            tag: 'div',
            classes: ['inputContainer'],
            textContent: '',
        });

        this.input = new BaseComponent<HTMLInputElement>({
            tag: 'input',
            classes: ['inputField'],
            textContent: '',
        }).getElement();
        this.input.setAttribute('required', '');
        this.input.setAttribute('type', 'text');
        this.label = new BaseComponent({
            tag: 'label',
            classes: ['labelField'],
            textContent: labelText,
        }).getElement();
        this.addChild(this.label);
        this.addChild(this.input);
    }

    getValue() {
        return this.input.value;
    }

    setCallback(cb: Callback<Event>) {
        if (typeof cb === 'function') {
            this.element.addEventListener('keyup', (event) => cb(event));
        }
    }
}
