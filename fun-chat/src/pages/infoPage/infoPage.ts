import BaseComponent from '../../components/baseComponent';
import Button from '../../components/buttons/button';

import './infoPage.css';
import MyLink from '../../components/myLink';

export default class InfoPage extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['page'],
        });
        this.configView();
    }

    configView() {
        const wrapper = new BaseComponent({
            tag: 'div',
            classes: ['infoWrapper'],
        });
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['infoTitle'],
            textContent: 'Fun Chat',
        });

        const text = new BaseComponent({
            tag: 'p',
            classes: ['infoText'],
            textContent:
                'Welcome to the chat room! This chat room has been created as part of the RSSchool JS/FE 2023Q3 course. Here you can chat with other users, send messages, and share your thoughts. Please remember that this is a learning project and we value your participation and feedback. Enjoy your conversations!',
        });

        const backBtn = new Button(['backBtn'], 'Back', () => {
            window.history.back();
        });

        wrapper.addChild([title, text, new MyLink(), backBtn]);
        this.addChild([wrapper]);
    }
}
