import LoginForm from '../../components/loginForm/loginForm';
import Button from '../../components/buttons/button';
import LoginInput from '../../components/loginForm/input/inputField';
import BasePage from '../basePage';
import { userLoginData } from '../../type/type';

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
                this.notifyObservers('login');
            },
            'submit'
        );
        const infoBtn = new Button(['form_btn'], 'About', (e) => {
            e.preventDefault();
            this.notifyObservers('showInfo');
        });
        const login = new LoginInput('User name', 3, 'userLogin', 'text');

        const password = new LoginInput(
            'Password',
            6,
            'userPassword',
            'password',
            /^(?=.*[0-9])(?=.*[A-Z]).+$/,
            'Password must contain at least one capital letter and a digit'
        );
        return new LoginForm([login, password], [loginBtn, infoBtn]);
    }

    clear() {
        this.form.removeInputValues();
    }
    getUser(): userLoginData {
        const userIputs = this.form.getInputValues();
        const userData: userLoginData = userIputs.reduce((acc, inputData) => {
            return { ...acc, ...inputData };
        }, {});
        return userData;
    }
}
