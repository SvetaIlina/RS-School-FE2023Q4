import LoginPage from '../pages/loginPage/loginPage';
import InfoPage from '../pages/infoPage/infoPage';
import { PageIds, checkedMessage, customEvent } from '../type/type';

import NotFound from '../pages/notFound/notFound';
import MainPage from '../pages/mainPage/mainPageView';

import Modal from '../components/modal/modal';
import { isNotNull } from '../servise/servise';

import { thirdPartyUser } from '../type/typeAPI';
import Message from '../components/chat/message/message';

import BasePage from '../pages/basePage';

export default class View extends BasePage {
    private modalIsOpen: boolean;

    private mainPage: MainPage | null;

    constructor() {
        super();
        this.mainPage = null;
        this.modalIsOpen = false;
        this.handleEvent([
            customEvent.SendMes,
            customEvent.LogOut,
            customEvent.ShowInfoPage,
            customEvent.SelectContact,
            customEvent.LogIn,
        ]);
    }

    handleEvent(events: string[]) {
        events.forEach((eventItem) => {
            this.element.addEventListener(eventItem, ((event: CustomEvent) => {
                this.notifyObservers(eventItem, event.detail);
            }) as EventListener);
        });
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

        content = page.getElement();

        this.setContent(content);
    }

    setContent(content: HTMLElement | null) {
        this.removeChild();
        if (content) {
            this.addChild([content]);
        }
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

    updateUserStatus(user: thirdPartyUser, isCurrentContact: boolean) {
        isNotNull(this.mainPage);
        this.mainPage.chat.contact.updateContact(user);
        if (isCurrentContact) {
            this.mainPage.chat.dialog.updateHeader(user.isLogined);
        }
    }

    setUserContact(user: thirdPartyUser) {
        isNotNull(this.mainPage);
        this.mainPage.chat.dialog.updateDialog(user);
    }

    showMessage(message: checkedMessage) {
        isNotNull(this.mainPage);
        const newMessage = new Message(message);
        this.mainPage.chat.dialog.addMessage(newMessage);
    }

    setUnreadMessage(sender: string) {
        isNotNull(this.mainPage);

        this.mainPage.chat.contact.displayUnreadMessage(sender, 'add');
    }
}
