import BaseComponent from '../../baseComponent';
import ChatData from '../chatData';
import DialogHeader from './dialoHeader/dialogHeader';
import './dialog.css';
import DialogMessages from './dialogMessage/dialogMessage';

export default class Dialog extends BaseComponent {
    private header: DialogHeader = new DialogHeader();
    private messages: DialogMessages = new DialogMessages();
    constructor() {
        super({
            tag: 'div',
            classes: ['dialog'],
        });
        this.addChild([this.header, this.messages]);
    }

    updateHeader(newUser: thirdPartyUser) {
        this.header.setUserValue(newUser);
    }
}
