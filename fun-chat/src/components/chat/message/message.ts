import { checkedMessage } from '../../../type/type';
import BaseComponent from '../../baseComponent';
import './message.css';

export default class Message extends BaseComponent {
    messageContent: string;

    messageDataTime: string;

    sender: string;

    status: string;

    isMyMessage: boolean;

    constructor(message: checkedMessage) {
        super({ tag: 'div', classes: ['message-wrapper'] });
        this.messageContent = message.text;
        this.messageDataTime = message.date;
        this.sender = message.sender;
        this.status = message.deliveredStatus;
        this.isMyMessage = message.isYour;
        this.drawMessage(this.sender, this.messageDataTime, this.messageContent, this.status);
    }

    drawMessage(sender: string, messageDataTime: string, content: string, status: string) {
        const message = new BaseComponent({
            tag: 'div',
            classes: ['message'],
        });
        const messageHeader = new BaseComponent({
            tag: 'div',
            classes: ['message_header'],
        });
        const messageSender = new BaseComponent({
            tag: 'span',
            classes: ['message_header-item'],
            textContent: `${sender}`,
        });
        const dataTime = new BaseComponent({
            tag: 'span',
            classes: ['message_header-item'],
            textContent: `${messageDataTime}`,
        });
        messageHeader.addChild([messageSender, dataTime]);
        const messageContent = new BaseComponent({
            tag: 'div',
            classes: ['message_content'],
            textContent: `${content}`,
        });

        const messageFooter = new BaseComponent({
            tag: 'div',
            classes: ['message_footer'],
        });
        if (this.isMyMessage) {
            this.setStyles(['myMessage']);
            messageFooter.setTextContent(`${status}`);
        }
        message.addChild([messageHeader, messageContent, messageFooter]);

        this.addChild([message]);
    }
}
