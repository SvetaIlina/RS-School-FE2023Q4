import BaseComponent from '../baseComponent';
import './modal.css';

export default class Modal extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['overlay'],
        });
    }

    buildModal(winsCar: string, winsTime: string) {
        const modal = new BaseComponent({
            tag: 'div',
            classes: ['modal'],
        });
        const winner = new BaseComponent({
            tag: 'span',
            classes: ['modalText'],
            textContent: `The winner is ${winsCar}`,
        });

        const time = new BaseComponent({
            tag: 'span',
            classes: ['modalText'],
            textContent: `The time is ${winsTime}sec`,
        });

        modal.addChild([winner, time]);
        this.addChild([modal]);
        this.openModal();
        setTimeout(() => this.closeModal(), 2000);
    }

    openModal() {
        document.body.append(this.getElement());
    }

    closeModal() {
        this.getElement().remove();
    }
}
