import { thirdPartyUser } from '../../../type/typeAPI';
import BaseComponent from '../../baseComponent';
import Message from '../message/message';

import DialogHeader from './dialoHeader/dialogHeader';
import './dialog.css';
import DialogInput from './dialogInput/dialogInput';
import DialogMessages from './dialogMessage/dialogMessage';

export default class Dialog extends BaseComponent {
    private header: DialogHeader = new DialogHeader();

    private messages: DialogMessages = new DialogMessages();

    private messageInput: DialogInput = new DialogInput();

    constructor() {
        super({
            tag: 'div',
            classes: ['dialog'],
        });
        this.addChild([this.header, this.messages, this.messageInput]);
    }

    updateHeader(newUser: thirdPartyUser) {
        this.header.setUserValue(newUser);
    }

    addMessage(message: Message) {
        const description = this.messages.element.querySelector('.description');
        if (description) {
            this.messages.removeChild();
        }
        this.messages.addChild([message]);
    }
}
