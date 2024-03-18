import PageView from '../pages/pageView';
import { userData } from '../type/type';
import BaseComponent from './baseComponent';

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

export function makeWordBlock(wordArray: Array<string>, parentWidth: number): Array<HTMLElement> {
    const maxOrder = wordArray.length;
    const letterWidth = 13;
    const lettersCount = wordArray.join('').split('').length;
    const newArray = wordArray.map((word) => {
        const wordElement = new BaseComponent({
            tag: 'div',
            classes: ['word'],
            textContent: `${word}`,
        }).getElement();
        wordElement.style.order = `${Math.round(Math.random() * maxOrder)}`;
        wordElement.style.width = `${(parentWidth - letterWidth * lettersCount) / maxOrder + word.split('').length * letterWidth}px`;
        return wordElement;
    });
    return newArray;
}

export function replaceWordBloc(currentBlock: EventTarget, targetBlock: Element): void {
    if (currentBlock instanceof HTMLElement) {
        if (currentBlock.classList.contains('word')) {
            const defaultBlock = new BaseComponent({
                tag: 'div',
                classes: ['empty'],
                textContent: ``,
            });
            currentBlock.replaceWith(defaultBlock.getElement());
            targetBlock.replaceWith(currentBlock);
        }
    }
}

export function getSentense(): string {
    const fraze: Array<string | null> = [];
    const sentence = document.querySelector('.incomplete');
    isNotNull(sentence);
    const words = sentence.querySelectorAll('.word');
    isNotNull(words);
    words.forEach((word) => {
        fraze.push(word.textContent);
    });
    return fraze.join(' ');
}

export function enableCheckBtn() {
    const sourseBlock = document.querySelector('.source');
    isNotNull(sourseBlock);

    const btn = document.querySelector('.checkBtn');
    isNotNull(btn);
    const sourseWords = sourseBlock.querySelectorAll('.word');
    if (!sourseWords.length) {
        btn.classList.remove('btn_disable');
    } else {
        btn.classList.add('btn_disable');
    }
}

export function compareSentense(originSentense: string, checkingWords: Array<Element>) {
    const originOrder = originSentense.split(' ');
    const sentenseLenght = originOrder.length;
    for (let i = 0; i < sentenseLenght; i += 1) {
        const checkingWord = checkingWords[i];
        const wordContent = checkingWord.textContent;
        if (originOrder[i] === wordContent) {
            checkingWord.classList.add('word--correct');
        } else {
            checkingWord.classList.add('word--incorrect');
        }
    }
}
