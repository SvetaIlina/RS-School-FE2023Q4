import { myLoginPageEmitter, myStartPageEmitter } from './emitter';
import { getUserData, isNotNull, changeContent } from './utils';
import { Callback } from '../util/type';
import LocalStore from './localStore';

const loginBtnCallback: Callback<Event> = (event) => {
    const localStore = new LocalStore('playerData');
    event.preventDefault();
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        isNotNull(form);
        localStore.saveData(getUserData(form));
        myLoginPageEmitter.emit('myEvent', changeContent(event.target));
    }
};

const startBtnCallback: Callback<Event> = (event) => {
    isNotNull(event.target);
    myStartPageEmitter.emit('myStartEvent', changeContent(event.target));
};

export { startBtnCallback, loginBtnCallback };
