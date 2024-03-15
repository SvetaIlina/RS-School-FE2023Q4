import PageView from '../pageView';
import Button from '../../components/buttons/button';
import ResultBlock from '../../components/gameField/resultBlock/resultBlock';
import { logOutBtnCallback } from '../../services/callbacks';
import SourceBlock from '../../components/gameField/sourceBlock/sourceBloc';
import data from '../../data/data.json';
import './gamePage.css';

export default class GamePageView extends PageView {
    private source = new SourceBlock();

    private result = new ResultBlock();

    private logOutBtn = new Button('Log Out', logOutBtnCallback);

    constructor(cssClass?: Array<string>) {
        super(['gamePage']);
        if (cssClass) {
            this.viewPage.setStyles(cssClass);
        }
        this.viewPage.addChild([this.result, this.source, this.logOutBtn]);
        this.source.getWords(data.rounds[0].words[0].textExample);
        this.result.splitSentence(data.rounds[0].words[0].textExample.split(/\W/).length);
    }
}
