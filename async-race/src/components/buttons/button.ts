import BaseComponent from '../baseComponent';

export default class Button extends BaseComponent {
    constructor(btnClasses: Array<string>, btnText: string, btnCallback: (event: Event) => void) {
        super({
            tag: 'button',
            classes: btnClasses,
            textContent: btnText,
            onClick: btnCallback,
            eventType: 'click',
        });
    }
}
