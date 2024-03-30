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

export function toggleBtn(e: Event) {
    const activeBtn = e.target;
    isNotNullElement<HTMLElement>(activeBtn);
    let blockedBtn;
    if (activeBtn.classList.contains('startBtn')) {
        blockedBtn = activeBtn.nextElementSibling;
    }
    if (activeBtn.classList.contains('stopBtn')) {
        blockedBtn = activeBtn.previousElementSibling;
    }

    isNotNull(blockedBtn);
    activeBtn.classList.add('disable');
    blockedBtn.classList.remove('disable');
}
