import LoginPage from './pages/loginPage/loginPage';
import InfoPage from './pages/infoPage/infoPage';
import { PageIds, checkedMessage } from './type/type';

import NotFound from './pages/notFound/notFound';
import MainPage from './pages/mainPage/mainPageView';

import Modal from './components/modal/modal';
import { isNotNull } from './servise/servise';

import { thirdPartyUser } from './type/typeAPI';
import Message from './components/chat/message/message';

import BasePage from './pages/basePage';

export default class MainView extends BasePage {
    private modalIsOpen: boolean;

    private mainPage: MainPage | null;

    constructor() {
        super();
        this.mainPage = null;
        this.modalIsOpen = false;
        this.handleEvent(['sendMessage', 'logOut', 'showInfo', 'contactSelected', 'login']);
    }

    handleEvent(events: string[]) {
        events.forEach((eventItem) => {
            this.element.addEventListener(eventItem, ((event: CustomEvent) => {
                this.notifyObservers(eventItem, event.detail);
            }) as EventListener);
        });
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

    setUserContact(user: thirdPartyUser) {
        isNotNull(this.mainPage);
        this.mainPage.updateChat(user);
    }

    addMessage(message: checkedMessage) {
        isNotNull(this.mainPage);
        const newMessage = new Message(message);
        this.mainPage.addNewMessage(newMessage);
    }

    setUnreadMessage(sender: string) {
        isNotNull(this.mainPage);
        const contact = document.getElementById(`${sender}`);
        isNotNull(contact);
        const messageContainer = contact.querySelector('.list_item-mes');
        isNotNull(messageContainer);
        let messageCount = Number(messageContainer.textContent);
        isNotNull(messageCount);
        messageContainer.textContent = `${(messageCount += 1)}`;
    }
}
