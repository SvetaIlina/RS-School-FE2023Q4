// export function isNotNull<T>(value: unknown): asserts value is NonNullable<T> {
//     if (value === null || value === undefined) {
//         throw new Error(`Not expected value: ${value}`);
//     }
// }
// export function isHTMLElement(value: unknown): asserts value is HTMLElement {
//     if (!(value instanceof HTMLElement)) {
//         throw new Error(`Expected value to be of type HTMLElement`);
//     }
// }

export default function isNotNullHTMLElement<T>(value: unknown): asserts value is T {
    if (value === null || value === undefined || !(value instanceof HTMLElement)) {
        throw new Error(`Not expected value: ${value}`);
    }
}
