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

    checkSavedUser(): boolean {
        if (sessionStorage.getItem(this.storageKey)) {
            this.isLogined = true;
            this.myUser = this.getUser();
            return true;
        }
        return false;
    }

    checkLogginedUser(): boolean {
        const allLogginedUsers = this.ActiveUser;
        const index = this.findUserIndex(allLogginedUsers);

        return index !== -1;
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
        const index = this.findUserIndex(allUsers);
        allUsers.splice(index, 1);
        return allUsers;
    }

    findUserIndex(array: thirdPartyUser[]): number {
        isNotNull(this.myUser);
        const logginedUserName = this.myUser.login;
        const index = array.findIndex((user) => user.login === logginedUserName);
        return index;
    }
}
