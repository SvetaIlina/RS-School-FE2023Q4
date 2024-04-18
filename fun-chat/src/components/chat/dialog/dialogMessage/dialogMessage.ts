import BaseComponent from '../../../baseComponent';
import './dialogMessage.css';

export default class DialogMessages extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['message-container'],
        });
        this.init();
    }

    init() {
        const description = new BaseComponent({
            tag: 'p',
            classes: ['description'],
            textContent: 'Select the user to send the message to...',
        });
        this.addChild([description]);
    }
}
