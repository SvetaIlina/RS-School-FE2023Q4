import BaseComponent from '../../../util/baseComponent';
import { Callback } from '../../../util/type';

import LoginInput from '../input/loginInput';
import Button from '../../buttons/button';
import './loginForm.css';

export default class LoginForm extends BaseComponent<HTMLFormElement> {
    name = new LoginInput('First Name', 3, 'name');

    surName = new LoginInput('Surname', 4, 'surName');

    loginBtn = new Button('Login', 'btn_disable');

    constructor(btnCB: Callback<Event>) {
        super({
            tag: 'form',
            classes: ['formContainer'],
            textContent: 'Please Login',
        });
        this.loginBtn.setCallback(btnCB);
        this.name.setCallback(() => this.checkValid());
        this.surName.setCallback(() => this.checkValid());
        this.addChild(this.name.getElement());
        this.addChild(this.surName.getElement());
        this.addChild(this.loginBtn.getElement());
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
