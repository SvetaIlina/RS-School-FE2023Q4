import BaseComponent from '../baseComponent';
import './modal.css';

export default class Modal extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['overlay'],
        });
    }

    buildModal(winsCar: string, winsTime: string): void {
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
        setTimeout(() => this.closeModal(), 3000);
    }

    openModal(): void {
        document.body.append(this.getElement());
    }

    closeModal(): void {
        this.getElement().remove();
    }
}
