import PageView from '../pageView';
// import BaseComponent from '../../util/baseComponent';
import ResultBlock from '../../components/resultBlock/resultBlock';
import SourceBlock from '../../components/sourceBlock/sourceBloc';
import data from '../../data/data.json';
import './gamePage.css';

export default class GamePageView extends PageView {
    private source = new SourceBlock();

    private result = new ResultBlock();

    constructor(cssClass: Array<string>) {
        super();
        this.viewPage.setStyles(cssClass);
        this.viewPage.addChild([this.result, this.source]);
        this.source.getWords(data.rounds[0].words[0].textExample);
        this.result.splitSentence(data.rounds[0].words[0].textExample.split(/\W/).length);
    }
}
