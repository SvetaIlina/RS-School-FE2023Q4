export type attribute = {
    key: string;
    value: string;
};

export type Callback<T, T2 = HTMLElement> = (data: T, arg?: T2) => void;

export interface elemOptions {
    tag: string;
    classes: Array<string>;
    textContent: string;
    attributes?: Array<attribute>;
    callback?: Callback<Event>;
}

export interface userData {
    name: string;
    surName: string;
}
