import BaseComponent from '../baseComponent';
import Contact from './contacts/contact';
import Dialog from './dialog/dialog';
import './chat.css';
import { thirdPartyUser } from '../../type/typeAPI';

export default class Chat extends BaseComponent {
    contact: Contact;

    dialog: Dialog;

    constructor() {
        super({
            tag: 'div',
            classes: ['chat'],
        });
        this.dialog = new Dialog();

        this.contact = new Contact();

        this.addChild([this.contact, this.dialog]);
    }

    createContact(contact: thirdPartyUser[]) {
        this.contact.drawContacts(contact);
    }
}
