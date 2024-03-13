import BaseComponent from '../../../util/baseComponent';
import { loginBtnCallback } from '../../../services/callbacks';
import LoginInput from '../input/loginInput';
import Button from '../../buttons/button';
import './loginForm.css';

export default class LoginForm extends BaseComponent<HTMLFormElement> {
    private name = new LoginInput('First Name', 3, 'name');

    private surName = new LoginInput('Surname', 4, 'surName');

    private loginBtn = new Button('Login', loginBtnCallback, 'btn_disable');

    constructor() {
        super({
            tag: 'form',
            classes: ['formContainer'],
            textContent: 'Please Login',
            attributes: [{ key: 'autocomplete', value: 'off' }],
        });

        this.name.setCallback(() => this.checkValid());
        this.surName.setCallback(() => this.checkValid());
        this.addChild([this.name, this.surName, this.loginBtn]);
    }

    checkValid() {
        const btn = this.loginBtn.getElement();
        if (this.getElement().checkValidity()) {
            btn.classList.remove('btn_disable');
        } else {
            btn.classList.add('btn_disable');
        }
    }
}
