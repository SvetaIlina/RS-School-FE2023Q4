import BaseComponent from '../baseComponent';
import './inputField.css';

export default class InputOptions extends BaseComponent {
    private textInput = new BaseComponent<HTMLInputElement>({
        tag: 'input',
        classes: ['inputField', 'textInput'],
        attributes: [
            {
                key: 'type',
                value: 'text',
            },
        ],
    });

    private colorInput = new BaseComponent<HTMLInputElement>({
        tag: 'input',
        classes: ['inputField', 'colorInput'],
        attributes: [
            {
                key: 'type',
                value: 'color',
            },
        ],
    });

    constructor() {
        super({
            tag: 'div',
            classes: ['inputOptionsContainer'],
        });
        this.createView();
    }

    createView(): void {
        this.addChild([this.textInput, this.colorInput]);
    }

    setText(value: string): void {
        this.textInput.element.value = value;
    }

    setColor(value: string): void {
        this.colorInput.element.value = value;
    }

    getText(): string {
        return this.textInput.element.value;
    }

    getColor(): string {
        return this.colorInput.element.value;
    }

    reset(): void {
        this.setText('');
        this.setColor('#000');
    }
}
