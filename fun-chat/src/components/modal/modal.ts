import BaseComponent from '../baseComponent';
import './modal.css';

export default class Modal extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['overlay'],
        });
    }

    buildModal(content: string): void {
        const modal = new BaseComponent({
            tag: 'div',
            classes: ['modal'],
        });
        const innerContent = new BaseComponent({
            tag: 'span',
            classes: ['modalText'],
            textContent: `${content}`,
        });

        modal.addChild([innerContent]);
        this.addChild([modal]);
        this.openModal();
        setTimeout(() => this.closeModal(), 2000);
    }

    openModal(): void {
        document.body.append(this.getElement());
    }

    closeModal(): void {
        this.getElement().remove();
    }
}
