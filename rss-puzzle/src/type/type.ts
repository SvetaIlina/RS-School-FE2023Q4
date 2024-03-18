export type attribute = {
    key: string;
    value: string;
};

export type Callback<T, T2 = undefined> = (data: T, arg1?: T2) => void;

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

export type Word = {
    audioExample: string;
    textExample: string;
    textExampleTranslate: string;
    id: number;
    word: string;
    wordTranslate: string;
};

export type Round = {
    levelData: LevelData;
    words: Word[];
};

export type Data = {
    rounds: Round[];
    roundsCount: number;
};

export type GameParametres = {
    level: number;
    round: number;
    sentense: number;
    sentenceCount: number;
    roundCount: number;
};
