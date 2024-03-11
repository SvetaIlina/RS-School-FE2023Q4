import PageView from '../pageView';
import LoginForm from '../../components/loginForm/form/loginForm';
import loginBtnCallback from '../../services/callbacks';

const loginPageView = new PageView();
const form = new LoginForm(loginBtnCallback);
loginPageView.addChild(form.getElement());

export default loginPageView;
