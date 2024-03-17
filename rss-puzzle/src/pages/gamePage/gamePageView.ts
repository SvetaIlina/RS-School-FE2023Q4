import PageView from '../pageView';
import Button from '../../components/buttons/button';
import GameField from '../../components/gameField/gameField';
import { logOutBtnCallback, continueBtnCallback } from '../../services/callbacks';

import './gamePage.css';

export default class GamePageView extends PageView {
    private logOutBtn = new Button('Log Out', logOutBtnCallback);

    constructor(cssClass?: Array<string>) {
        super(['gamePage']);
        if (cssClass) {
            this.viewPage.setStyles(cssClass);
        }

        this.viewPageElement();
    }

    viewPageElement() {
        const gameField = new GameField();

        const continueBtn = new Button(
            'Continue',
            (event) => {
                continueBtnCallback(event, gameField);
            },
            ['continueBtn', 'btn_disable']
        );
        this.viewPage.addChild([gameField, continueBtn, this.logOutBtn]);
    }
}
