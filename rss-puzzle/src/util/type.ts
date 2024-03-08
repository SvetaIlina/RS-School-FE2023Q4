export type Callback<T> = (data: T) => void;

export interface elemOptions {
    tag: string;
    classes: Array<string>;
    textContent: string;
    callback?: Callback<Event>;
}
