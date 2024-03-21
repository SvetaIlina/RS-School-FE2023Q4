export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes: Array<{ key: string; value: string }>;
    textContent: string;
    callback?: (argument: Event) => void;
    eventType: string;
};
