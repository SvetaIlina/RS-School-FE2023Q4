import BaseComponent from '../baseComponent';
import './modal.css';

export default class Modal extends BaseComponent {
    content: string;
    constructor(content: string) {
        super({
            tag: 'div',
            classes: ['overlay'],
        });
        this.content = content;
        this.buildModal(this.content);
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
    }

    openModal(): void {
        document.body.append(this.getElement());
    }

    closeModal(): void {
        this.getElement().remove();
    }
}
