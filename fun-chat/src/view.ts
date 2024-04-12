import BaseComponent from './components/baseComponent';
import LoginPage from './pages/loginPage';
import InfoPage from './pages/infoPage';

export default class MainView extends BaseComponent {
    private loginPage: LoginPage = new LoginPage();
    private infoPage: InfoPage = new InfoPage();

    constructor() {
        super({ tag: 'main', classes: ['CssClasses.MAIN'] });

        this.loginPage.subscribe(this);
        this.infoPage.subscribe(this);
        this.setContent(this.loginPage.getPageElement());
    }

    update(action: string) {
        switch (action) {
            case 'login':
                this.loginUser();
                break;
            case 'showInfo':
                this.setContent(this.infoPage.getPageElement());
                break;
            case 'back':
                history.back();
                break;
        }
    }

    loginUser() {
        const data = this.loginPage.getUser();
        return data;
    }

    setContent(content: HTMLElement) {
        this.removeChild();
        this.addChild([content]);
    }
}
