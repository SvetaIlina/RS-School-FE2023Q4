import BaseComponent from '../baseComponent';

export default class Button extends BaseComponent {
    constructor(btnClasses: Array<string>, btnText: string, btnCallback: () => void) {
        super({
            tag: 'button',
            classes: btnClasses,
            textContent: btnText,
            onClick: (event) => {
                event.preventDefault();
                btnCallback();
            },
            eventType: 'click',
        });
    }
}
