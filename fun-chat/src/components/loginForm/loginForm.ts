import BaseComponent from '../baseComponent';
import Button from '../buttons/button';
import LoginInput from './input/inputField';
import './form.css';
import { userLoginData } from '../../type/type';

export default class LoginForm extends BaseComponent<HTMLFormElement> {
    inputs: Array<LoginInput>;

    buttons: Array<Button>;

    constructor(inputs: Array<LoginInput>, buttons: Array<Button>) {
        super({
            tag: 'form',
            classes: ['formContainer', 'invalid'],
            attributes: [{ key: 'autocomplete', value: 'off' }],
        });
        this.inputs = inputs;
        this.buttons = buttons;
        this.setIputsCallback();
        this.addChild([...this.inputs, ...this.buttons]);
        this.setCallback((e) => this.formPreventDefault(e), 'keypress');
    }

    formPreventDefault(e: Event) {
        if (e instanceof KeyboardEvent) {
            if (e.keyCode === 13 && this.element.classList.contains('invalid')) {
                e.preventDefault();
            }
        }
    }

    setIputsCallback(): void {
        this.inputs.forEach((input: LoginInput) => input.element.addEventListener('input', () => this.checkValid()));
    }

    checkValid(): void {
        const form: HTMLFormElement = this.element;
        if (form.checkValidity()) {
            form.classList.remove('invalid');
        } else {
            form.classList.add('invalid');
        }
    }

    removeInputValues() {
        this.inputs.forEach((input) => input.clear());
    }

    getInputValues(): Array<userLoginData> {
        return this.inputs.map((input: LoginInput) => input.getInputValue());
    }
}
