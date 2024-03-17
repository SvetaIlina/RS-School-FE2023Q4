import StartPageView from '../pages/startPage/startPageView';
import GamePageView from '../pages/gamePage/gamePageView';
import { getUserData, isNotNull, loadNewContent, replaceWordBloc, checkSentense } from './utils';
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
    const btn = event.target;

    isNotNull(gameBlock);
    isNotNull(btn);
    if (btn instanceof HTMLElement) {
        btn.classList.add('btn_disable');
    }

    gameBlock.createView();
};

const sourceBlockCallback: Callback<Event, SourceBlock> = (event, sourseBlock) => {
    const currentWord = event.target;
    if (currentWord instanceof HTMLElement) {
        currentWord.style.order = '0';
    }
    const targetSentenseBlock = document.querySelector('.incomplete');
    isNotNull(targetSentenseBlock);
    const targetBlock = targetSentenseBlock.querySelector('.empty');
    isNotNull(currentWord);
    isNotNull(targetBlock);
    isNotNull(sourseBlock);
    replaceWordBloc(currentWord, targetBlock);
    checkSentense(sourseBlock.getElement(), sourseBlock.getSentense());
};

const resultBlockCallbac: Callback<Event> = (event) => {
    const currentWord = event.target;
    const sourceBlock = document.querySelector('.source');
    isNotNull(sourceBlock);
    const targetBlock = sourceBlock.querySelector('.empty');
    isNotNull(targetBlock);
    isNotNull(currentWord);

    if (currentWord instanceof HTMLElement) {
        if (currentWord.closest('.incomplete')) {
            replaceWordBloc(currentWord, targetBlock);
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
};
