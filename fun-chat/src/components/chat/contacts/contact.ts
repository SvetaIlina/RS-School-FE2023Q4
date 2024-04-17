import { isNotNullElement } from '../../../servise/servise';
import BaseComponent from '../../baseComponent';
import { searchUser } from '../../../servise/servise';
import './contact.css';

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

    contacts: Array<thirdPartyUser>;

    constructor(contacts: Array<thirdPartyUser>) {
        super({
            tag: 'div',
            classes: ['contacts'],
        });
        this.contacts = contacts;
        this.init(this.contacts);
        this.searchInput.setCallback((e) => searchUser(e, this.contactList.getElement()), 'keyup');
    }

    init(contacts: Array<thirdPartyUser>) {
        this.addContacts(contacts);
        this.addChild([this.searchInput, this.contactList]);
    }

    addContacts(contactList: Array<thirdPartyUser>) {
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
        this.contacts.push(contact);
    }

    updateContactStatus(contact: thirdPartyUser) {
        const userStatus: boolean = contact.isLogined;
        const listElement = this.contactList.getElement();
        const currentContact: Element | null = listElement.querySelector(`#${contact.login}`);
        isNotNullElement<HTMLElement>(currentContact);
        userStatus ? currentContact.classList.add('active') : currentContact.classList.remove('active');
    }
}
