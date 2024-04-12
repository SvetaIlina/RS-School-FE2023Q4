import BaseComponent from '../components/baseComponent';
import LoginForm from '../components/loginForm/loginForm';
import Button from '../components/button';
import LoginInput from '../components/loginForm/input/inputField';

export default class LoginPage extends BaseComponent {
    form: LoginForm;
    constructor() {
        super({
            tag: 'div',
            classes: ['page'],
        });
        this.form = this.createForm();
        this.addChild([this.form]);
    }

    createForm() {
        const loginBtn = new Button(
            ['form_btn', 'login-btn'],
            'Login',
            (e) => {
                e.preventDefault();
                console.log('login');
            },
            'submit'
        );
        const infoBtn = new Button(['form_btn'], 'About', (e) => {
            e.preventDefault();
            console.log('about');
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
}
