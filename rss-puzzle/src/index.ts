import './style.css';
import LoginForm from './components/loginForm/form/loginForm';
import loginBtnCallback from './services/callbacks';

document.body.append(new LoginForm(loginBtnCallback).getElement());
