import { isNotNull } from '../../servise/servise';
import Dialog from './dialog/dialog';

export default class ChatData {
    dialog: Dialog;
    contacts: Array<thirdPartyUser>;
    currentContact: thirdPartyUser | null;
    constructor(contactList: Array<thirdPartyUser>, dialog: Dialog) {
        this.dialog = dialog;
        this.contacts = contactList;
        this.currentContact = null;
    }

    updateSelectedContact(contactName: string | null) {
        isNotNull(contactName);
        const contact = this.contacts.find((item) => item.login === contactName);
        isNotNull(contact);
        this.currentContact = contact;
        this.dialog.updateHeader(contact);
    }
}
