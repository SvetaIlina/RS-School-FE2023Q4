export type Callback<T> = (argument: T) => void;

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<{ key: string; value: string }>;
    textContent: string;
    onClick?: Callback<Event>;
    eventType?: string;
};
