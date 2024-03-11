import myEmitter from './emitter';
import { getUserData, isNotNull } from './utils';
import { Callback } from '../util/type';

const loginBtnCallback: Callback<Event> = (event) => {
    event.preventDefault();
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        isNotNull(form);
        localStorage.setItem('playerData', JSON.stringify(getUserData(form)));
        myEmitter.emit('myEvent');
    }
};

export default loginBtnCallback;
