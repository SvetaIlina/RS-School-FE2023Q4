import { isNotNull } from '../../services/utils';
import BaseComponent from '../../util/baseComponent';
import { resultBlockCallbac } from '../../services/callbacks';
import './resultBlock.css';

export default class ResultBlock extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['result'],
            textContent: '',
            callback: resultBlockCallbac,
        });
        this.addChild();
    }

    addChild() {
        for (let i = 0; i < 10; i += 1) {
            const sentence = new BaseComponent({
                tag: 'div',
                classes: ['sentence', 'incomplete'],
                textContent: '',
            });

            this.element.append(sentence.getElement());
        }
    }

    splitSentence(wordCount: number) {
        const sentence = this.element.querySelector('.incomplete');
        isNotNull(sentence);
        for (let i = 0; i < wordCount; i += 1) {
            const block = new BaseComponent({
                tag: 'div',
                classes: ['empty'],
                textContent: `${i}`,
            });

            sentence.append(block.getElement());
        }
    }
}
