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

    private contactList: BaseComponent = new BaseComponent({
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
        this.contactList.setCallback((e) => this.contactListCallback(e), 'click');
    }

    init(contact: thirdPartyUser[]) {
        this.drawContacts(contact);
        this.addChild([this.searchInput, this.contactList]);
    }

    contactListCallback(e: Event) {
        const selectedContact = getSelectedContact(e);
        const myEvent = new CustomEvent('contactSelected', { bubbles: true, detail: selectedContact });
        this.contactList.getElement().dispatchEvent(myEvent);
    }

    drawContacts(contactList: Array<thirdPartyUser>) {
        contactList.forEach((contact) => {
            this.addNewContact(contact);
        });
    }

    addNewContact(contact: thirdPartyUser) {
        const listItem = new BaseComponent({
            tag: 'li',
            classes: ['list_item'],
            attributes: [{ key: 'id', value: `${contact.login}` }],
        });
        if (contact.isLogined) {
            listItem.setStyles(['active']);
        }
        const userName = new BaseComponent({
            tag: 'span',
            classes: ['list_item-name'],
            textContent: contact.login,
        });

        const unreadMessage = new BaseComponent({
            tag: 'span',
            classes: ['list_item-mes'],
            textContent: '',
        });
        listItem.addChild([userName, unreadMessage]);
        this.contactList.addChild([listItem]);
    }

    updateContact(contact: thirdPartyUser) {
        const userStatus: boolean = contact.isLogined;

        const currentContact: Element | null = document.getElementById(`${contact.login}`);

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
