import BaseComponent from '../../../util/baseComponent';
import { isNotNull, makeWordBlock } from '../../../util/utils';
import { sourceBlockCallback } from '../../../util/callbacks';
import './sourceBlock.css';

export default class SourceBlock extends BaseComponent {
    sentence: string;

    constructor() {
        super({
            tag: 'div',
            classes: ['source'],
            textContent: '',
            callback: (event) => {
                sourceBlockCallback(event);
            },
        });
        this.sentence = '';
    }

    setSentense(sentence: string) {
        this.sentence = sentence;
    }

    getSentense() {
        return this.sentence;
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
