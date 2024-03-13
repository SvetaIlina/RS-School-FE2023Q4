import BaseComponent from '../../../util/baseComponent';
import { Callback } from '../../../util/type';
import './loginInput.css';

export default class LoginInput extends BaseComponent {
    input: HTMLInputElement;

    label: HTMLElement;

    constructor(labelText: string, minInputLength: number, inputName: string) {
        super({
            tag: 'div',
            classes: ['inputContainer'],
            textContent: '',
        });

        this.input = new BaseComponent<HTMLInputElement>({
            tag: 'input',
            classes: ['inputField'],
            textContent: '',
            attributes: [
                { key: 'required', value: '' },
                { key: 'type', value: 'text' },
                { key: 'minlength', value: `${minInputLength}` },
                { key: 'pattern', value: '[a-zA-Z \\-]+' },
                { key: 'name', value: `${inputName}` },
            ],
        }).getElement();
        this.input.addEventListener('input', () => this.setValidMessage());

        this.label = new BaseComponent({
            tag: 'label',
            classes: ['labelField'],
            textContent: labelText,
        }).getElement();
        this.addChild([this.label, this.input]);
    }

    setCallback(cb: Callback<Event>) {
        if (typeof cb === 'function') {
            this.element.addEventListener('keyup', (event) => cb(event));
        }
    }

    setValidMessage() {
        const field: HTMLInputElement = this.input;
        const fieldValue: Array<string> = field.value.split('');
        const minlength: string | null = this.input.getAttribute('minlength');
        if (fieldValue.length) {
            if (field.validity.patternMismatch) {
                field.setCustomValidity('Accept only English alphabet letters and the hyphen symbol.');
            } else if (fieldValue[0].toLowerCase() === fieldValue[0]) {
                field.setCustomValidity('First letter must be in uppercase');
            } else if (field.validity.tooShort) {
                field.setCustomValidity(`Minimum length for the field must be ${minlength} symbols `);
            } else {
                field.setCustomValidity('');
            }
            field.reportValidity();
        }
    }
}
