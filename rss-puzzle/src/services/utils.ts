import { userData } from '../util/type';

export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function changeContent(eventTarget: EventTarget): HTMLElement | null {
    if (eventTarget instanceof HTMLElement) {
        const parentSection = eventTarget.closest('section');
        isNotNull(parentSection);
        return parentSection;
    }
    return null;
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
