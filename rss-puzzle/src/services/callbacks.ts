import { getUserData, isNotNull } from './utils';

export default function loginBtnCallback(event: Event): void {
    event.preventDefault();
    isNotNull(event.target);
    if (event.target instanceof HTMLElement) {
        const form = event.target.parentElement;
        isNotNull(form);
        localStorage.setItem('playerData', JSON.stringify(getUserData(form)));
    }
    console.log(123);
}
