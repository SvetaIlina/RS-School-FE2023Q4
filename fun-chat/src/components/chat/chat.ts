import BaseComponent from '../baseComponent';
import Contact from './contacts/contact';
import Dialog from './dialog/dialog';
import './chat.css';
import { thirdPartyUser } from '../../type/typeAPI';
import Message from './message/message';

export default class Chat extends BaseComponent {
    contact: Contact;

    dialog: Dialog;

    constructor(contact: thirdPartyUser[]) {
        super({
            tag: 'div',
            classes: ['chat'],
        });
        this.dialog = new Dialog();

        this.contact = new Contact(contact);

        this.addChild([this.contact, this.dialog]);
    }

    updateContact(user: thirdPartyUser) {
        this.contact.updateContact(user);
    }

    setHeader(user: thirdPartyUser) {
        this.dialog.updateHeader(user);
    }

    drawNewMessage(message: Message) {
        this.dialog.addMessage(message);
    }

    updateDialog() {
        this.dialog.updateDialogMessage();
    }
}
