import LoginPageView from '../pages/loginPage/loginPageView';
import StartPageView from '../pages/startPage/startPageView';
import LocalStore from '../util/localStore';

export default class App {
    private localStorageUserKey: string;

    constructor(localStorageUserKey: string) {
        this.localStorageUserKey = localStorageUserKey;
    }

    displayPage() {
        const loginUser = new LocalStore(this.localStorageUserKey);
        const loginPage = new LoginPageView();
        const startPage = new StartPageView(this.localStorageUserKey);
        if (loginUser.getData()) {
            startPage.setContent();
        } else {
            loginPage.setContent();
        }
    }
}
