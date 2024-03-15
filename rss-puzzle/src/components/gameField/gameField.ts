import SourceBlock from './sourceBlock/sourceBloc';
import ResultBlock from './resultBlock/resultBlock';
import BaseComponent from '../../util/baseComponent';

export default class GameField extends BaseComponent {
    private sourceBlock = new SourceBlock();

    private resultBlock = new ResultBlock();

    constructor() {
        super({
            tag: 'div',
            classes: ['gameField'],
            textContent: '',
        });
        this.addChild([this.resultBlock, this.sourceBlock]);
    }

    getSourse() {
        return this.sourceBlock;
    }

    getResult() {
        return this.resultBlock;
    }
}
