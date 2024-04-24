import LoginForm from '../../components/loginForm/loginForm';
import Button from '../../components/buttons/button';
import LoginInput from '../../components/loginForm/input/inputField';
import BasePage from '../basePage';
import { userLoginData } from '../../type/type';
import { infoCallback, isNotNull } from '../../servise/servise';

export default class LoginPage extends BasePage {
    form: LoginForm;

    constructor() {
        super();
        this.form = this.createForm();
        this.addChild([this.form]);
    }

    createForm(): LoginForm {
        const loginBtn = new Button(
            ['form_btn', 'login-btn'],
            'Login',
            (e) => {
                e.preventDefault();
                this.loginCallback(e);
            },
            'submit'
        );
        const infoBtn = new Button(['form_btn'], 'About', (e) => {
            e.preventDefault();
            infoCallback(this.getElement());
        });
        const login = new LoginInput('User name', 3, 'login', 'text');

        const password = new LoginInput(
            'Password',
            6,
            'password',
            'password',
            /^(?=.*[0-9])(?=.*[A-Z]).+$/,
            'Password must contain at least one capital letter and a digit'
        );
        return new LoginForm([login, password], [loginBtn, infoBtn]);
    }

    loginCallback(e: Event) {
        // eslint-disable-next-line no-debugger
        debugger;
        const btn = e.target;
        const user: string = this.getUser();
        const myEvent = new CustomEvent('login', { bubbles: true, detail: user });
        isNotNull(btn);
        btn.dispatchEvent(myEvent);
    }

    clear() {
        this.form.removeInputValues();
    }

    getUser(): string {
        const userIputs = this.form.getInputValues();
        const userData: userLoginData = userIputs.reduce((acc, inputData) => ({ ...acc, ...inputData }), {});
        return JSON.stringify(userData);
    }
}
