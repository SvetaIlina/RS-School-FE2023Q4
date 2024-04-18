import BaseComponent from '../baseComponent';
import Contact from './contacts/contact';
import Dialog from './dialog/dialog';
import './chat.css';
import ChatData from './chatData';

export default class Chat extends BaseComponent {
    contact: Contact;
    dialog: Dialog;
    chatData: ChatData;
    constructor(contactList: Array<thirdPartyUser>) {
        super({
            tag: 'div',
            classes: ['chat'],
        });
        this.dialog = new Dialog();
        this.chatData = new ChatData(contactList, this.dialog);
        this.contact = new Contact(this.chatData);

        this.addChild([this.contact, this.dialog]);
    }
}
