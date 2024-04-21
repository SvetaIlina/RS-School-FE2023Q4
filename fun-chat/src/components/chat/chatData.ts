import { isNotNull } from '../../servise/servise';
import Dialog from './dialog/dialog';
import { thirdPartyUser, currentUser } from '../../type/typeAPI';

export default class ChatData {
    dialog: Dialog | null;

    contacts: Array<thirdPartyUser> | null;

    currentContact: thirdPartyUser | null;

    myUser: currentUser | null;

    private storageKey: string = 'myUser';

    isLogined: boolean;

    ActiveUser: Array<thirdPartyUser>;

    inActiveUser: Array<thirdPartyUser>;

    constructor() {
        this.dialog = null;
        this.contacts = null;
        this.currentContact = null;
        this.myUser = null;
        this.ActiveUser = [];
        this.inActiveUser = [];
        this.isLogined = false;
    }

    // updateSelectedContact(contactName: string | null) {
    //     isNotNull(contactName);
    //     isNotNull(this.contacts);
    //     isNotNull(this.dialog);
    //     const contact = this.contacts.find((item) => item.login === contactName);
    //     isNotNull(contact);
    //     this.currentContact = contact;
    //     this.dialog.updateHeader(contact);
    // }

    setMyUser() {
        sessionStorage.setItem(this.storageKey, JSON.stringify(this.myUser));
        this.isLogined = true;
    }

    checkUser(): boolean {
        if (sessionStorage.getItem(this.storageKey)) {
            this.isLogined = true;
            this.myUser = this.getUser();
            return true;
        }
        return false;
    }

    checkLogginedUser(): thirdPartyUser | undefined {
        const logginedUser = this.myUser;
        const allLogginedUsers = this.ActiveUser;

        isNotNull(logginedUser);
        const user = allLogginedUsers.find((item) => item.login === logginedUser.login);
        return user;
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

    getAllContact(): thirdPartyUser[] {
        const allUsers = [...this.ActiveUser, ...this.inActiveUser];
        const { myUser } = this;
        isNotNull(myUser);
        const index = allUsers.findIndex((item) => item.login === myUser.login);

        allUsers.slice(index, 1);

        return allUsers;
    }
}
