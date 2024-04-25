import { customEvent } from '../type/type';
import { generalRequest, errorResponse, thirdPartyUser, currentUser } from '../type/typeAPI';

export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function isNotNullElement<T>(value: unknown): asserts value is T {
    if (value === null || value === undefined || !(value instanceof HTMLElement)) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function searchUser(e: Event, targetBlock: HTMLElement) {
    const input = e.target;
    isNotNullElement<HTMLInputElement>(input);
    const { value } = input;
    const users = Array.from(targetBlock.children);
    users.forEach((user) => {
        if (user instanceof HTMLElement) {
            const userName = user.textContent;
            const currentUser = user;
            isNotNull(userName);
            if (!userName.match(value)) {
                currentUser.style.display = 'none';
            } else {
                currentUser.style.display = 'block';
            }
        }
    });
}

export function checkServerData(dataFromServer: generalRequest | errorResponse, checkingType: string) {
    isNotNull(dataFromServer.payload);
    const { payload } = dataFromServer;

    if ('users' in payload && checkingType === 'users') {
        return payload.users;
    }
    if ('user' in payload && checkingType === 'user') {
        return payload.user;
    }
    if ('messages' in payload && checkingType === 'messages') {
        return payload.messages;
    }
    if ('message' in payload && checkingType === 'message') {
        return payload.message;
    }
    if ('error' in payload && checkingType === 'error') {
        return payload.error;
    }
    return null;
}

export function getSelectedContact(e: Event): string {
    let contactLogin: string;
    const { target } = e;

    isNotNullElement<HTMLElement>(target);
    if (target.classList.contains('list_item-name')) {
        isNotNull(target.textContent);
        contactLogin = target.textContent;
    } else if (target.classList.contains('list_item')) {
        const name = target.firstChild;
        isNotNull(name);
        isNotNull(name.textContent);
        contactLogin = name.textContent;
    } else {
        contactLogin = '';
    }
    return contactLogin;
}

export function findUserIndex(array: thirdPartyUser[], user: currentUser | thirdPartyUser): number {
    const logginedUserName = user.login;
    const index = array.findIndex((user) => user.login === logginedUserName);
    return index;
}

export function infoCallback(target: HTMLElement) {
    const myEvent = new CustomEvent(customEvent.ShowInfoPage, { bubbles: true });
    target.dispatchEvent(myEvent);
}
