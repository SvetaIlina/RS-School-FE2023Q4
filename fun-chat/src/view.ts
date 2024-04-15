import BaseComponent from './components/baseComponent';
import LoginPage from './pages/loginPage';
import InfoPage from './pages/infoPage/infoPage';
import { PageIds } from './type/type';
import Controller from './controller';
import Button from './components/buttons/button';
import Router from './router';

export default class MainView extends BaseComponent {
    private loginPage: LoginPage = new LoginPage();
    private infoPage: InfoPage = new InfoPage();

    private router: Router;

    constructor() {
        super({ tag: 'main', classes: ['CssClasses.MAIN'] });
        this.loginPage.subscribe(this);
        this.infoPage.subscribe(this);
        this.router = new Router(this);
        this.router.init();
    }

    update(action: string) {
        switch (action) {
            case 'login':
                {
                    sessionStorage.setItem('myUser', JSON.stringify(this.getloginUserData()));
                    this.router.route(PageIds.MainPage);
                }

                break;
            case 'showInfo':
                {
                    this.router.route(PageIds.InfoPage);
                }
                break;
            case 'back':
                history.back();
                break;
        }
    }

    getloginUserData() {
        const data = this.loginPage.getUser();
        return data;
    }

    setContent(idPage: string) {
        this.removeChild();

        let content: HTMLElement | null = null;

        if (idPage === PageIds.LoginPage) {
            content = this.loginPage.getPageElement();
        } else if (idPage === PageIds.MainPage) {
            content = new Button(['kkk'], 'uuu', () => console.log(555)).getElement();
        } else if (idPage === PageIds.InfoPage) {
            content = this.infoPage.getPageElement();
        }

        if (content) {
            this.addChild([content]);
        }
    }
}
