import BaseComponent from '../../util/baseComponent';
import { makeWordBlock } from '../../services/utils';
import { sourceBlockCallback } from '../../services/callbacks';
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

    getWords(sentence: string) {
        const words = sentence.split(/\W/);
        const parentWidth: number = 750;
        this.addChild(makeWordBlock(words, parentWidth));
    }
}
