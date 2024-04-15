import { Callback } from '../../type/type';
import BaseComponent from '../baseComponent';
import Button from '../buttons/button';
import './header.css';

export default class Header extends BaseComponent {
    userName: string;

    appName: string;
    logOutBtn: Button;
    infoBtn: Button;

    constructor(userName: string, appName: string, logOutCallback: Callback<Event>, infoCallback: Callback<Event>) {
        super({
            tag: 'header',
            classes: ['header'],
        });
        this.userName = userName;
        this.appName = appName;
        this.logOutBtn = new Button(['header_btn'], 'Log Out', logOutCallback);
        this.infoBtn = new Button(['header_btn'], 'About', infoCallback);
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
}
