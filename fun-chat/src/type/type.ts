export type Callback<T> = (argument: T) => void;

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<{ key: string; value: string }>;
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
