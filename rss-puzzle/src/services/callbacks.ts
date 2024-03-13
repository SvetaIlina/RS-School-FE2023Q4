import myEmitter from './emitter';
import { getUserData, isNotNull } from './utils';
import { Callback } from '../util/type';
import LocalStore from './localStore';

const loginBtnCallback: Callback<Event> = (event) => {
    const localStore = new LocalStore('playerData');
    event.preventDefault();
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        const parentSection = event.target.closest('section');
        isNotNull(form);
        isNotNull(parentSection);
        localStore.saveData(getUserData(form));
        myEmitter.emit('myEvent', parentSection);
    }
};

export default loginBtnCallback;
