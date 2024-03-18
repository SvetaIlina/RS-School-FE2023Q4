import PageView from '../pageView';
import Button from '../../components/buttons/button';
import GameField from '../../components/gameField/gameField';
import { logOutBtnCallback, continueBtnCallback, checkBtnCallback } from '../../services/callbacks';

import './gamePage.css';
import BaseComponent from '../../util/baseComponent';

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
        const btnConteiner = new BaseComponent({
            tag: 'div',
            classes: ['btn_container'],
            textContent: '',
        });
        const gameField = new GameField();

        const continueBtn = new Button(
            'Continue',
            (event) => {
                continueBtnCallback(event, gameField);
            },
            ['continueBtn', 'btn_disable']
        );
        const checkBtn = new Button(
            'Chek Sentense',
            (event) => {
                checkBtnCallback(event, gameField.getSourseBlock());
            },
            ['checkBtn', 'btn_disable']
        );
        btnConteiner.addChild([checkBtn, continueBtn, this.logOutBtn]);
        this.viewPage.addChild([gameField, btnConteiner]);
    }
}
