import LoginPage from './pages/loginPage/loginPage';
import InfoPage from './pages/infoPage/infoPage';
import { PageIds } from './type/type';

import NotFound from './pages/notFound/notFound';
import MainPage from './pages/mainPage/mainPageView';

import Modal from './components/modal/modal';
import { isNotNull } from './servise/servise';
import BasePage from './pages/basePage';
import { thirdPartyUser } from './type/typeAPI';

export default class MainView extends BasePage {
    private modalIsOpen: boolean;

    private mainPage: MainPage | null;

    constructor() {
        super();
        this.element = document.createElement('main');
        this.setStyles(['main']);
        this.mainPage = null;
        this.modalIsOpen = false;
    }

    update(action: string, data?: string) {
        switch (action) {
            case 'login': {
                isNotNull(data);

                this.notifyObservers(action, data);

                break;
            }

            case 'showInfo': {
                this.notifyObservers(action);

                break;
            }

            case 'logOut': {
                this.notifyObservers(action);

                break;
            }
            case 'back': {
                window.history.back();
                break;
            }

            default: {
                console.log('nothing');
            }
        }
    }

    setContent(content: HTMLElement | null) {
        this.removeChild();

        if (content) {
            this.addChild([content]);
        }
    }

    createPage(idPage: string, name?: string, contact?: thirdPartyUser[]): void {
        let content: HTMLElement | null = null;
        let page: LoginPage | MainPage | InfoPage | NotFound | null = null;
        if (idPage === PageIds.LoginPage) {
            page = new LoginPage();
        } else if (idPage === PageIds.MainPage) {
            isNotNull(name);
            isNotNull(contact);
            this.mainPage = new MainPage(name, contact);
            page = this.mainPage;
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
            this.closeThisModal(connectionStatus, modal);
        } else {
            this.replaceModal(message, connectionStatus);
        }
    }

    replaceModal(message: string, connectionStatus: boolean | undefined) {
        const openedModal = document.querySelector('.overlay');
        isNotNull(openedModal);
        const newModal = new Modal(`${message}`);
        openedModal.replaceWith(newModal.getElement());
        this.closeThisModal(connectionStatus, newModal);
    }

    closeThisModal(connectionStatus: boolean | undefined, modal: Modal) {
        if (connectionStatus) {
            this.modalIsOpen = false;
            setTimeout(() => modal.closeModal(), 1000);
        }
    }

    updateUserStatus(user: thirdPartyUser) {
        isNotNull(this.mainPage);
        this.mainPage.updateContactList(user);
    }
}
