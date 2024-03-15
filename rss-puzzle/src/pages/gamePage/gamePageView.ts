import PageView from '../pageView';
import Button from '../../components/buttons/button';
import GameField from '../../components/gameField/gameField';
import { Data } from '../../util/type';
import { logOutBtnCallback } from '../../services/callbacks';

import './gamePage.css';

export default class GamePageView extends PageView {
    private gameField = new GameField();

    private source = this.gameField.getSourse();

    private result = this.gameField.getResult();

    private logOutBtn = new Button('Log Out', logOutBtnCallback);

    constructor(data: Data, cssClass?: Array<string>) {
        super(['gamePage']);
        if (cssClass) {
            this.viewPage.setStyles(cssClass);
        }

        this.source.setWords(data.rounds[0].words[0].textExample);
        this.result.splitSentence(data.rounds[0].words[0].textExample.split(' ').length);
        this.viewPageElement();
    }

    viewPageElement() {
        this.viewPage.addChild([this.gameField, this.logOutBtn]);
    }
}
