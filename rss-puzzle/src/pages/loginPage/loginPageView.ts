import PageView from '../pageView';
import LoginForm from '../../components/loginForm/form/loginForm';
import loginBtnCallback from '../../services/callbacks';

export default class LoginPageView extends PageView {
    private form = new LoginForm(loginBtnCallback);

    constructor() {
        super();
        this.viewPage.addChild([this.form]);
    }
}
