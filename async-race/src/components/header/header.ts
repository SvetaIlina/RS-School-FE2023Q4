import View from '../../pages/view';
import BaseComponent from '../baseComponent';
import Button from '../buttons/button';

export default class HeaderView extends View {
    constructor() {
        super({
            tag: 'header',
            classes: ['header'],
        });
        this.configHeaderView();
    }

    configHeaderView() {
        const btnConteiner = new BaseComponent({
            tag: 'div',
            classes: ['headerBtnContainer'],
        });
        const garageBtn = new Button(['headerBtn'], 'garage', () => console.log('garage'));
        const winnerBtn = new Button(['headerBtn'], 'winners', () => console.log('winners'));
        btnConteiner.addChild([garageBtn, winnerBtn]);
        this.view.addChild([btnConteiner]);
    }
}
