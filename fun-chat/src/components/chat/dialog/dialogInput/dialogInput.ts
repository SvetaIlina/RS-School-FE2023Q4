import { isNotNullElement } from '../../../../servise/servise';
import { customEvent } from '../../../../type/type';
import BaseComponent from '../../../baseComponent';
import Button from '../../../buttons/button';
import './dialogInput.css';

export default class DialogInput extends BaseComponent {
    private sendBtn: Button;

    private messageInput: BaseComponent<HTMLInputElement> = new BaseComponent<HTMLInputElement>({
        tag: 'input',
        classes: ['message_input'],
        attributes: [
            { key: 'placeholder', value: 'message...' },
            { key: 'disabled', value: 'true' },
        ],
    });

    constructor() {
        super({
            tag: 'div',
            classes: ['dialog_input'],
        });
        this.sendBtn = new Button(['send_btn', 'inactive'], 'send', (e) => this.sendedMessage(e));
        this.messageInput.setCallback((e) => this.handleInputCallback(e), 'keyup');

        this.addChild([this.messageInput, this.sendBtn]);
    }

    handleInputCallback(e: Event) {
        if (e instanceof KeyboardEvent) {
            if (e.keyCode === 13) {
                this.sendedMessage(e);
            } else {
                this.enableBtn();
            }
        }
    }

    sendedMessage(e: Event) {
        const { target } = e;
        let message: string = '';

        isNotNullElement<HTMLElement>(target);

        if (target.classList.contains('send_btn')) {
            const input = this.messageInput.getElement();
            message = input.value;
        } else if (target.classList.contains('message_input') && target instanceof HTMLInputElement) {
            message = target.value;
        }
        if (message) {
            const myEvent = new CustomEvent(customEvent.SendMes, { bubbles: true, detail: message });
            target.dispatchEvent(myEvent);
        }
        this.resetInput();
    }

    resetInput() {
        this.messageInput.getElement().value = '';
        this.sendBtn.getElement().classList.add('inactive');
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
