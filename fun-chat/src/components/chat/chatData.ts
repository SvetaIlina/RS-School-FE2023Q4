import { isNotNull } from '../../servise/servise';
import Dialog from './dialog/dialog';

export default class ChatData {
    dialog: Dialog | null;
    contacts: Array<thirdPartyUser> | null;
    currentContact: thirdPartyUser | null;
    myUser: currentUser | null;
    private storageKey: string = 'myUser';
    isLogined: boolean;
    constructor() {
        this.dialog = null;
        this.contacts = null;
        this.currentContact = null;
        this.myUser = null;
        this.isLogined = false;
    }
    // constructor(contactList: Array<thirdPartyUser>, dialog: Dialog) {
    //     this.dialog = dialog;
    //     this.contacts = contactList;
    //     this.currentContact = null;
    // }

    updateSelectedContact(contactName: string | null) {
        isNotNull(contactName);
        isNotNull(this.contacts);
        isNotNull(this.dialog);
        const contact = this.contacts.find((item) => item.login === contactName);
        isNotNull(contact);
        this.currentContact = contact;
        this.dialog.updateHeader(contact);
    }

    setMyUser() {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.myUser));
        this.isLogined = true;
    }

    checkUser(): boolean {
        if (sessionStorage.getItem(this.storageKey)) {
            this.isLogined = true;
            this.myUser = this.getUser();
            return true;
        } else {
            return false;
        }
    }

    getUser(): currentUser {
        const user = sessionStorage.getItem(this.storageKey);
        isNotNull(user);
        return JSON.parse(user);
    }

    deleteUser() {
        this.myUser = null;
        this.isLogined = false;
        sessionStorage.removeItem(this.storageKey);
    }
}
