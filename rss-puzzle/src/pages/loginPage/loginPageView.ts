import PageView from '../pageView';
import LoginForm from '../../components/loginForm/form/loginForm';

export default class LoginPageView extends PageView {
    private form = new LoginForm();

    constructor() {
        super();
        this.viewPage.addChild([this.form]);
    }
}
