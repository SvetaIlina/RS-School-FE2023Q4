import StartPageView from '../pages/startPage/startPageView';
import GamePageView from '../pages/gamePage/gamePageView';
import { getUserData, isNotNull, loadNewContent, replaceWordBloc } from './utils';
import { Callback, userData } from '../util/type';
import LocalStore from './localStore';
import LoginPageView from '../pages/loginPage/loginPageView';

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

const sourceBlockCallback: Callback<Event> = (event) => {
    const currentWord = event.target;
    if (currentWord instanceof HTMLElement) {
        currentWord.style.order = '0';
    }
    const targetSentense = document.querySelector('.incomplete');
    isNotNull(targetSentense);
    const targetBlock = targetSentense.querySelector('.empty');
    isNotNull(currentWord);
    isNotNull(targetBlock);
    replaceWordBloc(currentWord, targetBlock);
};

const resultBlockCallbac: Callback<Event> = (event) => {
    const currentWord = event.target;
    const sourceBlock = document.querySelector('.source');
    isNotNull(sourceBlock);
    const targetBlock = sourceBlock.querySelector('.empty');

    isNotNull(targetBlock);
    isNotNull(currentWord);
    replaceWordBloc(currentWord, targetBlock);
};

export { startBtnCallback, loginBtnCallback, sourceBlockCallback, resultBlockCallbac, logOutBtnCallback };
