import Chat from '../../components/chat/chat';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { thirdPartyUser } from '../../type/typeAPI';
import BasePage from '../basePage';

export default class MainPage extends BasePage {
    header: Header;

    footer: Footer;

    chat: Chat;

    constructor(userName: string, contact: thirdPartyUser[]) {
        super();
        this.header = new Header(
            `${userName}`,
            'fun Chat',
            () => this.notifyObservers('logOut'),
            () => this.notifyObservers('showInfo')
        );
        this.footer = new Footer();

        this.chat = new Chat(contact);

        this.addChild([this.header, this.chat, this.footer]);
    }

    updateContactList(user: thirdPartyUser) {
        this.chat.updateContact(user);
    }
}
