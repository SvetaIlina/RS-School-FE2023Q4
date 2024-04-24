import BaseComponent from '../../components/baseComponent';
import Chat from '../../components/chat/chat';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { thirdPartyUser } from '../../type/typeAPI';

export default class MainPage extends BaseComponent {
    header: Header;

    footer: Footer;

    chat: Chat;

    constructor(userName: string, contact: thirdPartyUser[]) {
        super({
            tag: 'div',
            classes: ['page'],
        });
        this.header = new Header(`${userName}`, 'fun Chat');
        this.footer = new Footer();

        this.chat = new Chat(contact);

        this.addChild([this.header, this.chat, this.footer]);
    }
}
