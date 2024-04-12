import BaseComponent from './components/baseComponent';
import LoginPage from './pages/loginPage';
import InfoPage from './pages/infoPage';
import { PageIds } from './type/type';

export default class MainView extends BaseComponent {
    private loginPage: LoginPage = new LoginPage();
    private infoPage: InfoPage = new InfoPage();

    constructor() {
        super({ tag: 'main', classes: ['CssClasses.MAIN'] });

        this.loginPage.subscribe(this);
        this.infoPage.subscribe(this);
        this.setContent(PageIds.LoginPage);
        this.enableRouteChange();
    }

    update(action: string) {
        switch (action) {
            case 'login':
                {
                    console.log(this.loginUser());
                    window.location.hash = PageIds.MainPage;
                }

                break;
            case 'showInfo':
                {
                    window.location.hash = PageIds.InfoPage;
                }
                break;
            case 'back':
                history.back();
                break;
        }
    }

    enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            this.setContent(hash);
        });
    }

    loginUser() {
        const data = this.loginPage.getUser();
        return data;
    }

    setContent(idPage: string) {
        this.removeChild();

        let content: HTMLElement | null = null;

        if (idPage === PageIds.LoginPage) {
            content = this.loginPage.getPageElement();
            // } else if (idPage === PageIds.MainPage) {
            //   content = new SettingsPage(idPage);
        } else if (idPage === PageIds.InfoPage) {
            content = this.infoPage.getPageElement();
        }

        if (content) {
            this.addChild([content]);
        }
    }
}
