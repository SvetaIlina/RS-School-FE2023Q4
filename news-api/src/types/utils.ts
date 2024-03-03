export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw new Error(`Not expected value: ${value}`);
    }
}

export function getEl(selector: string, parent: DocumentFragment): HTMLElement {
    const el = parent.querySelector(selector);
    isNotNull(el);
    if (!(el instanceof HTMLElement)) {
        throw new Error(`No HTMLElement found matching the selector: "${selector}"`);
    }
    return el;
}
