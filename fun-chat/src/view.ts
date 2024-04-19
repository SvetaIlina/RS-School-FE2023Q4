import BaseComponent from './components/baseComponent';
import LoginPage from './pages/loginPage/loginPage';
import InfoPage from './pages/infoPage/infoPage';
import { PageIds } from './type/type';
import Router from './router';
import NotFound from './pages/notFound/notFound';
import mainPage from './pages/mainPage/mainPageView';

import Modal from './components/modal/modal';
import { isNotNull } from './servise/servise';

export default class MainView extends BaseComponent {
    private loginPage: LoginPage = new LoginPage();
    private infoPage: InfoPage = new InfoPage();
    private mainPage: mainPage = new mainPage();
    private notFoundPage: NotFound = new NotFound();
    private router: Router;
    private modalIsOpen: boolean;

    constructor() {
        super({ tag: 'main', classes: ['MAIN'] });
        this.loginPage.subscribe(this);
        this.infoPage.subscribe(this);
        this.mainPage.subscribe(this);
        this.router = new Router(this);
        this.modalIsOpen = false;
        this.router.init();
    }

    update(action: string) {
        switch (action) {
            case 'login':
                {
                    sessionStorage.setItem('myUser', JSON.stringify(this.getloginUserData()));
                    this.router.route(PageIds.MainPage);
                    this.loginPage.clear();
                }

                break;
            case 'showInfo':
                {
                    this.router.route(PageIds.InfoPage);
                }
                break;
            case 'logOut': {
                sessionStorage.removeItem('myUser');
                this.router.route(PageIds.LoginPage);
                break;
            }
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
            content = this.mainPage.getPageElement();
        } else if (idPage === PageIds.InfoPage) {
            content = this.infoPage.getPageElement();
        } else {
            content = this.notFoundPage.getElement();
        }

        if (content) {
            this.addChild([content]);
        }
    }

    showModal(message: string, connectionStatus?: boolean) {
        if (!this.modalIsOpen) {
            const modal = new Modal(`${message}`);
            modal.openModal();
            this.modalIsOpen = true;
        } else {
            this.replaceModal(message, connectionStatus);
        }
    }

    replaceModal(message: string, connectionStatus: boolean | undefined) {
        const openedModal = document.querySelector('.overlay');
        isNotNull(openedModal);
        const newModal = new Modal(`${message}`);
        openedModal.replaceWith(newModal.getElement());
        if (connectionStatus) {
            this.modalIsOpen = false;
            setTimeout(() => newModal.closeModal(), 1000);
        }
    }
}
