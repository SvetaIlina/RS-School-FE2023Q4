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
        this.ws = new MyWebSocket(url, this.showConnectMessage.bind(this), this.handleWebSocketMessage.bind(this));
        this.router = new Router(this, this.model);
    }
    init() {
        let hash: string;
        this.model.checkUser() ? (hash = PageIds.MainPage) : (hash = PageIds.LoginPage);
        this.router.route(hash);
        this.view.showModal(ConnectMessage.InProcess);
        this.ws.initWebSocket();
    }

    showConnectMessage(isOpen: boolean): void {
        this.view.showModal(ConnectMessage.Ready, isOpen);
    }

    handleWebSocketMessage(e: MessageEvent) {
        let errorMessage: string;
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
            case messageType.Error: {
                if ('error' in dataFromServer.payload) {
                    errorMessage = dataFromServer.payload.error;

                    this.view.showModal(errorMessage, this.ws.isOpen);
                }
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
        this.model.myUser = user;
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
}
