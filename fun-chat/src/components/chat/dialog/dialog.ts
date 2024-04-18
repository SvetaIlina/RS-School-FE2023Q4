import BaseComponent from '../../baseComponent';
import ChatData from '../chatData';
import DialogHeader from './dialoHeader/dialogHeader';
import './dialog.css';

export default class Dialog extends BaseComponent {
    private header: DialogHeader = new DialogHeader();
    constructor() {
        super({
            tag: 'div',
            classes: ['dialog'],
        });
        this.addChild([this.header]);
    }

    updateHeader(newUser: thirdPartyUser) {
        this.header.setUserValue(newUser);
    }
}
