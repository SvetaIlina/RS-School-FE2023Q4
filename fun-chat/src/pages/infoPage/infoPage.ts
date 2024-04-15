import BaseComponent from '../../components/baseComponent';
import Button from '../../components/buttons/button';
import BasePage from '../basePage';
import './infoPage.css';

export default class InfoPage extends BasePage {
    constructor() {
        super();
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

        const myLink = new BaseComponent({
            tag: 'a',
            classes: ['infoLink'],
            textContent: 'Author Svetlana Ilina',
            attributes: [{ key: 'href', value: 'https://github.com/SvetaIlina' }],
        });

        const backBtn = new Button(['backBtn'], 'Back', () => {
            this.notifyObservers('back');
        });
        wrapper.addChild([title, text, myLink, backBtn]);
        this.addChild([wrapper]);
    }
}
