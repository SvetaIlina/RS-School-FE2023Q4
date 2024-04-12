import BaseComponent from '../baseComponent';
import Button from '../buttons/button';
import LoginInput from './input/inputField';
import './form.css';

export default class LoginForm extends BaseComponent<HTMLFormElement> {
    // private login = new LoginInput('User name', 3, 'userLogin', 'text');

    // private password = new LoginInput(
    //     'Password',
    //     6,
    //     'userPassword',
    //     'password',
    //     /^(?=.*[0-9])(?=.*[A-Z]).+$/,
    //     'Password must contain at least one capital letter and a digit'
    // );

    // private loginBtn = new Button(
    //     ['form_btn', 'login-btn'],
    //     'Login',
    //     (e) => {
    //         e.preventDefault();
    //         console.log('login');
    //     },
    //     'submit'
    // );
    // private infoBtn = new Button(['form_btn'], 'About', (e) => {
    //     e.preventDefault();
    //     console.log('about');
    // });
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

    getInputValues(): Array<{
        [key: string]: string;
    }> {
        return this.inputs.map((input: LoginInput) => input.getInputValue());
    }
}
