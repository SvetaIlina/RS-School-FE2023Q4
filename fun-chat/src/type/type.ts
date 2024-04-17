export type Callback<T> = (argument: T) => void;

type attribute = { key: string; value: string };

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<attribute>;
    textContent?: string;
};

export const enum PageIds {
    LoginPage = 'login-page',
    MainPage = 'main-page',
    InfoPage = 'info-page',
}

export type userLoginData = {
    [key: string]: string;
};
