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
    if ('message' in payload && checkingType === 'message') {
        return payload.message;
    }
    if ('error' in payload && checkingType === 'error') {
        return payload.error;
    }
    return null;
}

export function getSelectedContact(e: Event): string | null {
    let contactLogin: string | null = null;
    const { target } = e;
    isNotNullElement<HTMLElement>(target);
    if (target.classList.contains('list_item-name')) {
        contactLogin = target.textContent;
    }
    return contactLogin;
}

export function findUserIndex(array: thirdPartyUser[], user: currentUser | thirdPartyUser): number {
    const logginedUserName = user.login;
    const index = array.findIndex((user) => user.login === logginedUserName);
    return index;
}
