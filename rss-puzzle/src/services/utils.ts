import PageView from '../pages/pageView';
import { userData } from '../util/type';

export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function getCurrentContent(eventTarget: EventTarget): HTMLElement | null {
    if (eventTarget instanceof HTMLElement) {
        const parentSection = eventTarget.closest('section');
        isNotNull(parentSection);
        return parentSection;
    }
    return null;
}

export function loadNewContent<T>(newPage: T, eTarget: EventTarget): void {
    const currentPage = getCurrentContent(eTarget);
    isNotNull(currentPage);
    if (newPage instanceof PageView) {
        currentPage.replaceWith(newPage.getHTMLElement());
    }
}

export function getUserData(parent: HTMLElement): userData {
    const data: userData = {
        name: '',
        surName: '',
    };
    const inputs: Array<HTMLInputElement> = Array.from(parent.querySelectorAll('.inputField'));

    inputs.forEach((input) => {
        const inputName = input.getAttribute('name');
        const inputValue = input.value;
        if (inputName === 'name') {
            data.name = inputValue;
        } else if (inputName === 'surName') {
            data.surName = inputValue;
        }
    });

    return data;
}
