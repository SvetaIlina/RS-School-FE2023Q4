export type Callback<T, T2 = HTMLElement> = (data: T, arg?: T2) => void;

export interface elemOptions {
    tag: string;
    classes: Array<string>;
    textContent: string;
    callback?: Callback<Event>;
}

export interface userData {
    name: string;
    surName: string;
}
