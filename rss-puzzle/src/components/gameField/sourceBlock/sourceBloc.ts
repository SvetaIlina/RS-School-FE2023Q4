import BaseComponent from '../../../util/baseComponent';
import { isNotNull, makeWordBlock } from '../../../services/utils';
import { sourceBlockCallback } from '../../../services/callbacks';
import './sourceBlock.css';

export default class SourceBlock extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['source'],
            textContent: '',
            callback: sourceBlockCallback,
        });
    }

    setWords(sentence: string) {
        const words = sentence.split(' ');
        const parentWidth: number = 750;
        while (this.getElement().firstElementChild) {
            const child = this.getElement().firstElementChild;
            isNotNull(child);

            child.remove();
        }
        this.addChild(makeWordBlock(words, parentWidth));
    }
}
