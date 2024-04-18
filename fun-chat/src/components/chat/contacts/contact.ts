import { isNotNull, isNotNullElement } from '../../../servise/servise';
import BaseComponent from '../../baseComponent';
import { searchUser } from '../../../servise/servise';
import './contact.css';

import ChatData from '../chatData';

export default class Contact extends BaseComponent {
    private searchInput: BaseComponent<HTMLInputElement> = new BaseComponent<HTMLInputElement>({
        tag: 'input',
        classes: ['contacts_search'],
        attributes: [{ key: 'placeholder', value: 'Search...' }],
    });
    private contactList: BaseComponent<HTMLUListElement> = new BaseComponent<HTMLUListElement>({
        tag: 'ul',
        classes: ['contacts_list'],
    });

    constructor(chatData: ChatData) {
        super({
            tag: 'div',
            classes: ['contacts'],
        });

        this.init(chatData.contacts);
        this.searchInput.setCallback((e) => searchUser(e, this.contactList.getElement()), 'keyup');
        this.contactList.setCallback((e) => {
            chatData.updateSelectedContact(this.getSelectedContact(e));
        }, 'click');
    }

    init(contacts: Array<thirdPartyUser>) {
        this.drawContacts(contacts);
        this.addChild([this.searchInput, this.contactList]);
    }

    drawContacts(contactList: Array<thirdPartyUser>) {
        contactList.forEach((contact) => {
            this.addNewContact(contact);
        });
    }

    addNewContact(contact: thirdPartyUser) {
        const listItem = new BaseComponent<HTMLUListElement>({
            tag: 'li',
            classes: ['list_item'],
            textContent: contact.login,
            attributes: [{ key: 'id', value: `${contact.login}` }],
        });
        if (contact.isLogined) {
            listItem.setStyles(['active']);
        }
        this.contactList.addChild([listItem]);
    }

    updateContactStatus(contact: thirdPartyUser) {
        const userStatus: boolean = contact.isLogined;
        const listElement = this.contactList.getElement();
        const currentContact: Element | null = listElement.querySelector(`#${contact.login}`);
        isNotNullElement<HTMLElement>(currentContact);
        userStatus ? currentContact.classList.add('active') : currentContact.classList.remove('active');
    }

    getSelectedContact(e: Event): string | null {
        let contactLogin: string | null = null;
        const target: EventTarget | null = e.target;
        isNotNullElement<HTMLElement>(target);
        if (target.classList.contains('list_item')) {
            contactLogin = target.textContent;
        }
        return contactLogin;
    }
}
