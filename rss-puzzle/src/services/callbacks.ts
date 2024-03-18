import StartPageView from '../pages/startPage/startPageView';
import GamePageView from '../pages/gamePage/gamePageView';
import {
    getUserData,
    isNotNull,
    loadNewContent,
    replaceWordBloc,
    enableCheckBtn,
    getSentense,
    compareSentense,
} from './utils';
import { Callback, userData } from '../util/type';
import LocalStore from './localStore';
import LoginPageView from '../pages/loginPage/loginPageView';
import GameField from '../components/gameField/gameField';
import SourceBlock from '../components/gameField/sourceBlock/sourceBloc';

const loginBtnCallback: Callback<Event> = (event) => {
    event.preventDefault();
    const localStore = new LocalStore('playerData');
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        isNotNull(form);
        localStore.saveData<userData>(getUserData(form));
    }
    const newPage = new StartPageView('playerData');
    loadNewContent<StartPageView>(newPage, event.target);
};

const startBtnCallback: Callback<Event> = (event) => {
    isNotNull(event.target);
    const newPage = new GamePageView(['gamePage']);
    loadNewContent<GamePageView>(newPage, event.target);
};

const logOutBtnCallback: Callback<Event> = (event) => {
    const localStore = new LocalStore('playerData');
    localStore.removeData();
    isNotNull(event.target);
    const newPage = new LoginPageView();
    loadNewContent<LoginPageView>(newPage, event.target);
};

const continueBtnCallback: Callback<Event, GameField> = (event, gameBlock) => {
    const continueBtn = event.target;

    isNotNull(gameBlock);
    isNotNull(continueBtn);

    if (continueBtn instanceof HTMLElement) {
        continueBtn.classList.add('btn_disable');
    }

    gameBlock.createView();
};

const checkBtnCallback: Callback<Event, SourceBlock> = (event, sourseBlock) => {
    isNotNull(sourseBlock);
    const checkBtn = event.target;
    isNotNull(checkBtn);
    const checkingFraze: string = getSentense();
    const currentLevelSentense = sourseBlock.getSentense();
    const currentSentense = document.querySelector('.incomplete');
    isNotNull(currentSentense);
    const checkingWords = Array.from(currentSentense.querySelectorAll('.word'));
    if (checkingFraze === currentLevelSentense) {
        currentSentense.classList.remove('incomplete');
        const continueBtn = document.querySelector('.continueBtn');
        isNotNull(continueBtn);
        continueBtn.classList.remove('btn_disable');
    }
    if (checkBtn instanceof HTMLElement) {
        checkBtn.classList.add('btn_disable');
    }
    compareSentense(currentLevelSentense, checkingWords);
};

const sourceBlockCallback: Callback<Event, SourceBlock> = (event) => {
    const currentWord = event.target;
    if (currentWord instanceof HTMLElement) {
        currentWord.style.order = '0';
    }
    const targetSentenseBlock = document.querySelector('.incomplete');
    isNotNull(targetSentenseBlock);
    const targetBlock = targetSentenseBlock.querySelector('.empty');
    isNotNull(currentWord);
    isNotNull(targetBlock);
    replaceWordBloc(currentWord, targetBlock);
    enableCheckBtn();
};

const resultBlockCallbac: Callback<Event> = (event) => {
    const currentWord = event.target;
    const sourceBlock = document.querySelector('.source');
    isNotNull(sourceBlock);
    const targetBlock = sourceBlock.querySelector('.empty');
    if (targetBlock) {
        isNotNull(currentWord);

        if (currentWord instanceof HTMLElement) {
            if (currentWord.closest('.incomplete')) {
                replaceWordBloc(currentWord, targetBlock);
                currentWord.classList.remove('word--correct', 'word--incorrect');
                enableCheckBtn();
            }
        }
    }
};

export {
    startBtnCallback,
    loginBtnCallback,
    sourceBlockCallback,
    resultBlockCallbac,
    logOutBtnCallback,
    continueBtnCallback,
    checkBtnCallback,
};
