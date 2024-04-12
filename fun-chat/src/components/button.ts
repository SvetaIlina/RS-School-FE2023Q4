import BaseComponent from './baseComponent';

export default class Button extends BaseComponent {
    constructor(btnClasses: Array<string>, btnText: string, btnCallback: (event: Event) => void, btnType?: string) {
        super({
            tag: 'button',
            classes: btnClasses,
            textContent: btnText,
        });
        this.setCallback(btnCallback, 'click');
        if (btnType) {
            this.setAttributes([{ key: 'type', value: `${btnType}` }]);
        }
    }
}
