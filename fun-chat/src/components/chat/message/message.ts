import BaseComponent from '../../baseComponent';
import './message.css';

export default class Message extends BaseComponent {
    messageContent: string;
    messageDataTime: number;
    sender: string;
    status: string;
    constructor(message: Omit<receivedMessage, 'status'> & { status: string }) {
        super({ tag: 'div', classes: ['message-wrapper', 'myMessage'] });
        this.messageContent = message.text;
        this.messageDataTime = message.datetime;
        this.sender = message.from;
        this.status = message.status;
        this.drawMessage(this.sender, this.messageDataTime, this.messageContent, this.status);
    }

    drawMessage(sender: string, messageDataTime: number, content: string, status: string) {
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
            textContent: `${status}`,
        });
        message.addChild([messageHeader, messageContent, messageFooter]);
        this.addChild([message]);
    }
}
