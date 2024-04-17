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
    const value: string = input.value;
    const users = Array.from(targetBlock.children);
    users.forEach((user) => {
        if (user instanceof HTMLElement) {
            const userName = user.textContent;
            isNotNull(userName);
            if (!userName.match(value)) {
                user.style.display = 'none';
            } else {
                user.style.display = 'block';
            }
        }
    });
}
