import { getSelectedContact, searchUser } from '../../../servise/servise';
import { thirdPartyUser } from '../../../type/typeAPI';
import BaseComponent from '../../baseComponent';
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

    contact: thirdPartyUser[];

    constructor(contact: thirdPartyUser[]) {
        super({
            tag: 'div',
            classes: ['contacts'],
        });
        this.contact = contact;
        this.init(this.contact);
        this.searchInput.setCallback((e) => searchUser(e, this.contactList.getElement()), 'keyup');
        this.contactList.setCallback((e) => {
            getSelectedContact(e);
        }, 'click');
    }

    init(contact: thirdPartyUser[]) {
        this.drawContacts(contact);
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

    updateContact(contact: thirdPartyUser) {
        const userStatus: boolean = contact.isLogined;
        const listElement = this.contactList.getElement();
        const currentContact: Element | null = listElement.querySelector(`#${contact.login}`);

        if (currentContact) {
            if (userStatus) {
                currentContact.classList.add('active');
            } else {
                currentContact.classList.remove('active');
            }
        } else {
            this.addNewContact(contact);
        }
    }
}
