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

type LevelData = {
    id: string;
    name: string;
    imageSrc: string;
    author: string;
    year: string;
    cutSrc?: string;
};

type Word = {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
};

type Round = {
    levelData: LevelData;
    words: Word[];
};

export type Data = {
    rounds: Round[];
    roundsCount: number;
};
