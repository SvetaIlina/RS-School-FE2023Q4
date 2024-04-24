import BaseComponent from '../baseComponent';
import Button from '../buttons/button';
import './header.css';

export default class Header extends BaseComponent {
    userName: string;

    appName: string;

    logOutBtn: Button;

    infoBtn: Button;

    constructor(userName: string, appName: string) {
        super({
            tag: 'header',
            classes: ['header'],
        });
        this.userName = userName;
        this.appName = appName;
        this.logOutBtn = new Button(['header_btn'], 'Log Out', this.logOutCallback.bind(this));
        this.infoBtn = new Button(['header_btn'], 'About', this.infoCallback.bind(this));
        this.configView();
    }

    configView() {
        const btnWrapper = new BaseComponent({ tag: 'div', classes: ['btnWrapper'] });
        btnWrapper.addChild([this.infoBtn, this.logOutBtn]);

        const user = new BaseComponent({
            tag: 'span',
            classes: ['header_item'],
            textContent: `User : ${this.userName}`,
        });
        const appTitle = new BaseComponent({ tag: 'span', classes: ['header_item'], textContent: `${this.appName}` });
        this.addChild([user, appTitle, btnWrapper]);
    }

    logOutCallback() {
        const myEvent = new CustomEvent('logOut', { bubbles: true });
        this.logOutBtn.getElement().dispatchEvent(myEvent);
    }

    infoCallback() {
        const myEvent = new CustomEvent('showInfo', { bubbles: true });
        this.infoBtn.getElement().dispatchEvent(myEvent);
    }
}
