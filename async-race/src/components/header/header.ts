import View from '../view';
import BaseComponent from '../baseComponent';
import MainView from '../main/main';
import Button from '../buttons/button';
import isNotNullHTMLElement from '../../servise/servise';
import './header.css';

export default class HeaderView extends View {
    mainComponent: MainView;

    constructor(mainComponent: MainView) {
        super({
            tag: 'header',
            classes: ['header'],
        });
        this.configHeaderView();
        this.mainComponent = mainComponent;
    }

    configHeaderView() {
        const wrapper = new BaseComponent({
            tag: 'div',
            classes: ['wrapper', 'headerWrapper'],
        });
        const title = new BaseComponent({
            tag: 'h1',
            classes: ['headerTitle'],
            textContent: 'Async Race',
        });
        const btnConteiner = new BaseComponent({
            tag: 'div',
            classes: ['headerBtnContainer'],
        });
        const garageBtn = new Button(['headerBtn'], 'garage', (event: Event) => this.showContent(event));
        const winnerBtn = new Button(['headerBtn'], 'winners', (event: Event) => this.showContent(event));
        btnConteiner.addChild([garageBtn, winnerBtn]);
        wrapper.addChild([btnConteiner, title]);
        this.view.addChild([wrapper]);
    }

    showContent(event: Event) {
        isNotNullHTMLElement<HTMLElement>(event.target);
        const content = this.mainComponent.getChild();
        const btnName = event.target.textContent;
        content.forEach((item) => {
            item.classList.remove('hidden');
            if (!item.classList.contains(`${btnName}`)) {
                item.classList.add('hidden');
            }
        });
    }
}
