import { findUserIndex, isNotNull } from '../../servise/servise';
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
        isNotNull(this.myUser);
        const allLogginedUsers = this.ActiveUser;
        const index = findUserIndex(allLogginedUsers, this.myUser);

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
        isNotNull(this.myUser);
        const index = findUserIndex(allUsers, this.myUser);
        allUsers.splice(index, 1);
        return allUsers;
    }

    changeUserStatus(user: thirdPartyUser) {
        if (user.isLogined) {
            this.ActiveUser.push(user);
            const index = findUserIndex(this.inActiveUser, user);
            if (index !== -1) {
                this.inActiveUser.splice(index, 1);
            } else {
                this.inActiveUser.push(user);
                const index = findUserIndex(this.ActiveUser, user);
                this.ActiveUser.splice(index, 1);
            }
        }
    }

    setCurrentContact(userName: string) {
        const contacts = this.getAllContact();
        const contact = contacts.find((user) => user.login === userName);
        if (contact) {
            this.currentContact = contact;
        }
    }
}
