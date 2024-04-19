import BaseComponent from './components/baseComponent';
import LoginPage from './pages/loginPage/loginPage';
import InfoPage from './pages/infoPage/infoPage';
import { PageIds } from './type/type';

import NotFound from './pages/notFound/notFound';
import mainPage from './pages/mainPage/mainPageView';

import Modal from './components/modal/modal';
import { isNotNull } from './servise/servise';
import BasePage from './pages/basePage';

export default class MainView extends BasePage {
    private modalIsOpen: boolean;

    constructor() {
        super();
        this.element = document.createElement('main');
        this.setStyles(['main']);

        this.modalIsOpen = false;
    }

    update(action: string, data?: string) {
        switch (action) {
            case 'login':
                {
                    isNotNull(data);

                    this.notifyObservers(action, data);
                }

                break;
            case 'showInfo':
                {
                    this.notifyObservers(action);
                }
                break;
            case 'logOut': {
                sessionStorage.removeItem('myUser');
                // this.router.route(PageIds.LoginPage);
                break;
            }
            case 'back':
                history.back();
                break;
        }
    }

    setContent(content: HTMLElement | null) {
        this.removeChild();

        if (content) {
            this.addChild([content]);
        }
    }

    createPage(idPage: string, name?: string): void {
        let content: HTMLElement | null = null;
        let page: LoginPage | mainPage | InfoPage | NotFound | null = null;
        if (idPage === PageIds.LoginPage) {
            page = new LoginPage();
        } else if (idPage === PageIds.MainPage) {
            isNotNull(name);
            page = new mainPage(name);
        } else if (idPage === PageIds.InfoPage) {
            page = new InfoPage();
        } else {
            page = new NotFound();
        }
        page.subscribe(this);
        content = page.getElement();

        this.setContent(content);
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
