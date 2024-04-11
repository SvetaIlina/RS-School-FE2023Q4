import BaseComponent from '../baseComponent';

import { isNotNull } from '../../servise';

export default class LoginInput extends BaseComponent {
    input: BaseComponent<HTMLInputElement>;

    label: BaseComponent;

    constructor(
        labelText: string,
        minInputLength: number,
        inputName: string,
        inputType: string,
        passwordRegex?: RegExp,
        passwordValidatyMessage?: string
    ) {
        super({
            tag: 'div',
            classes: ['inputContainer'],
        });

        this.input = new BaseComponent<HTMLInputElement>({
            tag: 'input',
            classes: ['inputField'],
            attributes: [
                { key: 'required', value: '' },
                { key: 'type', value: `${inputType}` },
                { key: 'minlength', value: `${minInputLength}` },
                { key: 'name', value: `${inputName}` },
            ],
        });
        this.input.setCallback(() => this.setValidMessage(passwordRegex, passwordValidatyMessage), 'input');

        this.label = new BaseComponent({
            tag: 'label',
            classes: ['labelField'],
            textContent: labelText,
        });
        this.addChild([this.label, this.input]);
    }

    setValidMessage(regex: RegExp | undefined, messsage: string | undefined) {
        const field: HTMLInputElement = this.input.getElement();

        const minlength: string | null = field.getAttribute('minlength');

        if (field.validity.tooShort) {
            field.setCustomValidity(`Minimum length for the field must be ${minlength} symbols `);
        } else {
            field.setCustomValidity('');
        }
        if (regex && messsage) {
            if (!regex.test(field.value)) {
                field.setCustomValidity(`${messsage}`);
            }
        }

        field.reportValidity();
    }
}
