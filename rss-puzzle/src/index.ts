import './style.css';
import LoginPageView from './pages/loginPage/loginPageView';
import StartPageView from './pages/startPage/startPageView';
import LocalStore from './services/localStore';

class App {
    private localStorageUserKey: string;

    constructor(localStorageUserKey: string) {
        this.localStorageUserKey = localStorageUserKey;
    }

    displayPage() {
        const loginUser = new LocalStore(this.localStorageUserKey);
        const loginPage = new LoginPageView();
        const startPage = new StartPageView(this.localStorageUserKey);
        if (loginUser) {
            startPage.setContent();
        } else {
            loginPage.setContent();
        }
    }
}

const app = new App('playerData');
app.displayPage();

// import GamePageView from './pages/gamePage/gamePageView';
// new GamePageView(['gamePage']).setContent();
