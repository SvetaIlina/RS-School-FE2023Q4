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

    createView() {
        this.addChild([this.textInput, this.colorInput]);
    }

    setText(value: string) {
        this.textInput.element.value = value;
    }

    setColor(value: string) {
        this.colorInput.element.value = value;
    }

    getText() {
        return this.textInput.element.value;
    }

    getColor() {
        return this.colorInput.element.value;
    }

    reset() {
        this.setText('');
        this.setColor('#000');
    }
}
