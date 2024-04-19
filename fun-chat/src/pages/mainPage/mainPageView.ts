import Chat from '../../components/chat/chat';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasePage from '../basePage';

export default class mainPage extends BasePage {
    header: Header;
    footer: Footer;
    chat: Chat;
    constructor(userName: string) {
        super();
        this.header = new Header(
            `${userName}`,
            'fun Chat',
            () => this.notifyObservers('logOut'),
            () => this.notifyObservers('showInfo')
        );
        this.footer = new Footer();
        this.chat = new Chat([{ login: 'www', isLogined: false }]);

        this.addChild([this.header, this.chat, this.footer]);
    }
}
