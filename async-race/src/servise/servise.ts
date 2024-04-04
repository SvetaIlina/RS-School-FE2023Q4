import CarContainer from '../components/main/garage/careContainer/carContainer';
import { carBrands, carModels } from '../carsData/carsData';
import { carData } from '../type/types';

export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}
export function isHTMLElement(value: unknown): asserts value is HTMLElement {
    if (!(value instanceof HTMLElement)) {
        throw new Error(`Expected value to be of type HTMLElement`);
    }
}

export function isNotNullElement<T>(value: unknown): asserts value is T {
    if (value === null || value === undefined || !(value instanceof HTMLElement)) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function toggleBtn(activeBtn: EventTarget) {
    isNotNullElement<HTMLElement>(activeBtn);
    let blockedBtn;
    if (activeBtn.classList.contains('startBtn') || activeBtn.classList.contains('startRace')) {
        blockedBtn = activeBtn.nextElementSibling;
    }
    if (activeBtn.classList.contains('stopBtn') || activeBtn.classList.contains('resetRace')) {
        blockedBtn = activeBtn.previousElementSibling;
    }

    isNotNull(blockedBtn);
    activeBtn.classList.add('disable');
    blockedBtn.classList.remove('disable');
}

export function dispatchBtnEvent(parent: CarContainer, btnSelector: string) {
    const button = parent.getElement().querySelector(`.${btnSelector}`);
    isNotNull(button);
    const clickEvent = new Event('click');
    button.dispatchEvent(clickEvent);
}

function getRandomName(): string {
    const index: number = Math.floor(Math.random() * carModels.length);
    const brand: string = carBrands[index];
    const model: string = carModels[index];
    return `${brand} ${model}`;
}

function getRandomColor(): string {
    const hexCodes: string = '0123456789ABCDEF';
    let color: string = '';
    for (let i = 0; i < 6; i += 1) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    }
    return `#${color}`;
}

export function getRandomCarInfo(): carData {
    return {
        name: getRandomName(),
        color: getRandomColor(),
    };
}

export function getActiveBtns() {
    const mainElem = document.querySelector('.main');
    isNotNull(mainElem);
    const allBtns = Array.from(mainElem.querySelectorAll('.btn'));
    return allBtns.filter((btn) => !btn.classList.contains('disable'));
}
