export type Callback<T> = (argument: T) => void;

type attribute = { key: string; value: string };

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<attribute>;
    textContent?: string;
};

export enum PageIds {
    LoginPage = 'login-page',
    MainPage = 'main-page',
    InfoPage = 'info-page',
}
export enum ConnectMessage {
    InProcess = 'Connecting...',
    Ready = 'Connect',
}

export type userLoginData = {
    [key: string]: string;
};

export enum userStatus {
    OnLine = 'On Line',
    OffLine = 'Off Line',
}

export enum messageType {
    Login = 'USER_LOGIN',
    Error = 'ERROR',
    Logout = 'USER_LOGOUT',
    AnotherUserLogin = 'USER_EXTERNAL_LOGIN',
    AnotherUserLogout = 'USER_EXTERNAL_LOGOUT',
    ActiveUser = 'USER_ACTIVE',
    InactiveUser = 'USER_INACTIVE',
    SendMSG = 'MSG_SEND',
    MsgHistory = 'MSG_FROM_USER',
    MsgDelivered = 'MSG_DELIVER',
    MsgRead = 'MSG_READ',
    MsgDelete = 'MSG_DELETE',
    MsgEdit = 'MSG_EDIT',
}

export type checkedMessage = {
    text: string;
    sender: string;
    date: string;
    isYour: boolean;
    deliveredStatus: string;
};
