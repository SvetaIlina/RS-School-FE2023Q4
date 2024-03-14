import StartPageView from '../pages/startPage/startPageView';
import PageView from '../pages/pageView';
import { getUserData, isNotNull, loadNewContent } from './utils';
import { Callback } from '../util/type';
import LocalStore from './localStore';

const loginBtnCallback: Callback<Event> = (event) => {
    event.preventDefault();
    const localStore = new LocalStore('playerData');
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        isNotNull(form);
        localStore.saveData(getUserData(form));
    }
    const newPage = new StartPageView(['startPage'], 'playerData');
    loadNewContent<StartPageView>(newPage, event.target);
};

const startBtnCallback: Callback<Event> = (event) => {
    isNotNull(event.target);
    const newPage = new PageView();
    loadNewContent<PageView>(newPage, event.target);
};

export { startBtnCallback, loginBtnCallback };
