import BaseComponent from '../baseComponent';
import MainElement from '../main/main';
import Button from '../buttons/button';
import { isNotNullElement } from '../../servise/servise';
import './header.css';
import WinnersView from '../main/winners/winners';
import { mainsChild } from '../../type/types';

export default class HeaderElement extends BaseComponent {
    mainComponent: MainElement;

    constructor(mainComponent: MainElement) {
        super({
            tag: 'header',
            classes: ['header'],
        });
        this.configHeaderElement();
        this.mainComponent = mainComponent;
    }

    configHeaderElement(): void {
        const wrapper: BaseComponent = new BaseComponent({
            tag: 'div',
            classes: ['wrapper', 'headerWrapper'],
        });
        const title: BaseComponent = new BaseComponent({
            tag: 'span',
            classes: ['headerTitle'],
            textContent: 'Async Race',
        });
        const btnConteiner: BaseComponent = new BaseComponent({
            tag: 'div',
            classes: ['headerBtnContainer'],
        });
        const garageBtn: Button = new Button(['btn', 'headerBtn'], 'garage', (event: Event) => this.showContent(event));
        const winnerBtn: Button = new Button(['btn', 'headerBtn'], 'winners', (event: Event) =>
            this.showContent(event)
        );
        btnConteiner.addChild([garageBtn, winnerBtn]);
        wrapper.addChild([btnConteiner, title]);
        this.addChild([wrapper]);
    }

    showContent(event: Event): void {
        isNotNullElement<HTMLElement>(event.target);
        const content: Array<mainsChild> = this.mainComponent.getChild();
        const btnName: string | null = event.target.textContent;
        content.forEach((item: mainsChild) => {
            item.getViewElement().classList.remove('hidden');
            if (!item.getViewElement().classList.contains(`${btnName}`)) {
                item.getViewElement().classList.add('hidden');
            }
            if (item instanceof WinnersView) {
                item.configView();
            }
        });
    }
}
