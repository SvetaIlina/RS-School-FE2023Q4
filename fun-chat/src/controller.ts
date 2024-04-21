import ChatData from './components/chat/chatData';
import Router from './router';
import { isNotNull } from './servise/servise';
import { ConnectMessage, PageIds, messageType } from './type/type';
import MainView from './view';
import MyWebSocket from './webSocket';

export default class Controller {
    private model: ChatData;
    private view: MainView;
    private router: Router;
    private ws: MyWebSocket;

    constructor(url: string, model: ChatData, view: MainView) {
        this.model = model;
        this.view = view;
        this.view.subscribe(this);
        this.ws = new MyWebSocket(
            url,
            this.handleWebSocketOnopen.bind(this),
            this.handleWebSocketMessage.bind(this),
            this.handleWebSocketOnClose.bind(this)
        );
        this.router = new Router(this, this.model);
    }
    init() {
        let hash: string;
        this.model.checkUser() ? (hash = PageIds.MainPage) : (hash = PageIds.LoginPage);
        this.router.route(hash);
        this.view.showModal(ConnectMessage.InProcess);
        this.ws.initWebSocket();
    }

    handleWebSocketOnopen(isOpen: boolean, message: string): void {
        this.getAllUsers.call(this, messageType.ActiveUser);
        this.getAllUsers.call(this, messageType.InactiveUser);
        this.view.showModal(message, isOpen);
    }

    handleWebSocketOnClose(isOpen: boolean, message: string) {
        this.view.showModal(message, isOpen);
    }

    handleWebSocketMessage(e: MessageEvent) {
        const dataFromServer: generalRequest | errorResponse = JSON.parse(e.data);
        const type = dataFromServer.type;

        switch (type) {
            case messageType.Login: {
                this.model.isLogined = true;
                this.model.setMyUser();
                this.router.route(PageIds.MainPage);
                break;
            }
            case messageType.Logout: {
                this.model.deleteUser();
                this.router.route(PageIds.LoginPage);
                break;
            }
            case messageType.ActiveUser: {
                const users = this.checkServerData(dataFromServer, 'users');
                if (Array.isArray(users)) {
                    this.model.ActiveUser = users as thirdPartyUser[];
                }

                break;
            }
            case messageType.InactiveUser: {
                const users = this.checkServerData(dataFromServer, 'users');
                if (Array.isArray(users)) {
                    this.model.inActiveUser = users as thirdPartyUser[];
                }

                break;
            }
            case messageType.Error: {
                const errorMessage = this.checkServerData(dataFromServer, 'error');
                if (typeof errorMessage === 'string') {
                    this.view.showModal(errorMessage, this.ws.isOpen);
                }

                break;
            }
        }
    }

    update(action: string, data?: string) {
        switch (action) {
            case 'login': {
                isNotNull(data);
                this.authorizeUser(data);
                break;
            }
            case 'showInfo': {
                this.router.route(PageIds.InfoPage);
                break;
            }
            case 'logOut': {
                this.userLogout();
            }
        }
    }

    displayContent(hash: string) {
        if (this.model.myUser) {
            const name = this.model.myUser.login;
            this.view.createPage(hash, name);
        } else {
            this.view.createPage(hash);
        }
    }

    authorizeUser(data: string) {
        const user = JSON.parse(data);
        this.model.myUser = user;
        const alreadyLogined = Boolean(this.model.checkLogginedUser());
        if (!alreadyLogined) {
            console.log(this.model.ActiveUser);

            const serverRequest: generalRequest = {
                id: crypto.randomUUID(),
                type: messageType.Login,
                payload: {
                    user: {
                        login: user.login,
                        password: user.password,
                    },
                },
            };
            this.ws.sendRequest(serverRequest);
        } else {
            const modalMessage = 'User is already authorize';
            this.model.myUser = null;
            this.view.showModal(modalMessage, this.ws.isOpen);
        }
    }

    getAllUsers(userStatus: string) {
        const serverRequest: generalRequest = {
            id: crypto.randomUUID(),
            type: userStatus,
            payload: null,
        };

        this.ws.sendRequest(serverRequest);
    }

    userLogout() {
        const user = this.model.myUser;
        isNotNull(user);
        const serverRequest: generalRequest = {
            id: crypto.randomUUID(),
            type: messageType.Logout,
            payload: {
                user: {
                    login: user.login,
                    password: user.password,
                },
            },
        };
        this.ws.sendRequest(serverRequest);
    }

    checkServerData(dataFromServer: generalRequest | errorResponse, checkingType: string) {
        isNotNull(dataFromServer.payload);
        const payload = dataFromServer.payload;

        if ('users' in payload && checkingType === 'users') {
            return payload.users;
        } else if ('message' in payload && checkingType === 'message') {
            return payload.message;
        } else if ('error' in payload && checkingType === 'error') {
            return payload.error;
        }
        return null;
    }
}
