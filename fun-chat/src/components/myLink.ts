import BaseComponent from './baseComponent';

export default class myLink extends BaseComponent {
    constructor() {
        super({
            tag: 'a',
            classes: ['infoLink'],
            textContent: 'Author Svetlana Ilina',
            attributes: [{ key: 'href', value: 'https://github.com/SvetaIlina' }],
        });
    }
}
