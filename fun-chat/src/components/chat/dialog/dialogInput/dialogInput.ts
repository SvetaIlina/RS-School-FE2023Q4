import { isNotNullElement } from '../../../../servise/servise';
import BaseComponent from '../../../baseComponent';
import Button from '../../../buttons/button';
import './dialogInput.css';

export default class DialogInput extends BaseComponent {
    private sendBtn: Button;

    private messageInput: BaseComponent<HTMLInputElement> = new BaseComponent<HTMLInputElement>({
        tag: 'input',
        classes: ['message_input'],
        attributes: [{ key: 'placeholder', value: 'message...' }],
    });

    constructor() {
        super({
            tag: 'div',
            classes: ['dialog_input'],
        });
        this.sendBtn = new Button(['send_btn', 'inactive'], 'send', (e) => this.sendedMessage(e));
        this.messageInput.setCallback(() => this.enableBtn(), 'keyup');
        this.addChild([this.messageInput, this.sendBtn]);
    }

    sendedMessage(e: Event) {
        const btn = e.target;
        isNotNullElement<HTMLElement>(btn);
        const input = this.messageInput.getElement();
        const message = input.value;
        if (message) {
            console.log('send');
        } else {
            console.log('nothing');
        }

        input.value = '';
        btn.classList.add('inactive');
    }

    enableBtn() {
        const input = this.messageInput.getElement();
        const btn = this.sendBtn.getElement();
        if (input.value) {
            btn.classList.remove('inactive');
        } else {
            btn.classList.add('inactive');
        }
    }
}
