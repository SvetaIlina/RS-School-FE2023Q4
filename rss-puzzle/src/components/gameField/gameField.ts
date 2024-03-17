import SourceBlock from './sourceBlock/sourceBloc';
import ResultBlock from './resultBlock/resultBlock';
import BaseComponent from '../../util/baseComponent';
import level1Data from '../../data/level1.json';
import level2Data from '../../data/level2.json';
import { Data, Round, Word, GameParametres } from '../../util/type';

export default class GameField extends BaseComponent {
    private AllLevelData: Array<Data> = [level1Data, level2Data];

    private sourceBlock = new SourceBlock();

    private resultBlock = new ResultBlock();

    private levelNumber = 1;

    private roundNumber = 1;

    private sentenseNumber = 1;

    constructor() {
        super({
            tag: 'div',
            classes: ['gameField'],
            textContent: '',
        });

        this.addChild([this.resultBlock, this.sourceBlock]);
        this.createView();
    }

    createView() {
        const params = this.checkParams();
        const currentLevel: Data = this.AllLevelData[params.level - 1];
        const currentRound: Round = currentLevel.rounds[params.round - 1];
        const currentSentense: Word = currentRound.words[params.sentense - 1];
        const wordsNumber = currentSentense.textExample.split(' ').length;

        this.sourceBlock.setWords(currentSentense.textExample);
        this.sourceBlock.setSentense(currentSentense.textExample);
        this.resultBlock.splitSentence(wordsNumber);
        this.sentenseNumber += 1;
    }

    getRoundCount(level: number) {
        return this.AllLevelData[level - 1].roundsCount;
    }

    getSentenceCount(level: number, round: number) {
        return this.AllLevelData[level - 1].rounds[round - 1].words.length;
    }

    getParametres() {
        const params: GameParametres = {
            level: this.levelNumber,
            round: this.roundNumber,
            sentense: this.sentenseNumber,
            sentenceCount: this.getSentenceCount(this.levelNumber, this.roundNumber),
            roundCount: this.getRoundCount(this.levelNumber),
        };

        return params;
    }

    checkParams() {
        const params = this.getParametres();
        if (params.sentense > params.sentenceCount) {
            this.sentenseNumber = 1;
            this.roundNumber += 1;
            if (params.round > params.roundCount + 1) {
                this.roundNumber = 1;
                this.levelNumber += 1;
            }
            this.resultBlock.removeChild();
            this.resultBlock.addChild();
        }

        return this.getParametres();
    }
}
