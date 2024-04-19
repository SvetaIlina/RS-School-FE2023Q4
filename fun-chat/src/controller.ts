import ChatData from './components/chat/chatData';
import Router from './router';
import { isNotNull } from './servise/servise';
import { ConnectMessage, PageIds, messageType } from './type/type';
import MainView from './view';

export default class Controller {
    private model: ChatData;
    private view: MainView;
    private isOpen: boolean;
    private router: Router;
    url: string;
    ws: WebSocket | null;
    constructor(url: string, model: ChatData, view: MainView) {
        this.model = model;
        this.view = view;
        this.view.subscribe(this);
        this.url = url;
        this.isOpen = false;
        this.ws = null;
        this.router = new Router(this, this.model);
    }
    init() {
        let hash: string;
        this.model.checkUser() ? (hash = PageIds.MainPage) : (hash = PageIds.LoginPage);
        this.router.route(hash);
        this.initWebSocket();
    }

    initWebSocket() {
        this.view.showModal(ConnectMessage.InProcess);
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', () => this.onOpen());

        this.ws.addEventListener('message', (e) => {
            this.onMessage(e);
        });
        this.ws.addEventListener('close', () => {
            this.onClose();
        });
    }

    onOpen() {
        this.isOpen = true;
        this.view.showModal(ConnectMessage.Ready, this.isOpen);
    }

    onClose() {
        isNotNull(this.ws);
        this.ws.removeEventListener('open', () => this.onOpen());
        this.ws.removeEventListener('close', () => this.onClose());
        this.initWebSocket();
    }

    onMessage(e: MessageEvent) {
        const dataFromServer: generalRequest | errorResponse = JSON.parse(e.data);
        const type = dataFromServer.type;
        switch (type) {
            case messageType.Login:
                this.model.isLogined = true;
                this.router.route(PageIds.MainPage);
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
        isNotNull(this.ws);
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
        this.ws.send(JSON.stringify(serverRequest));
    }
}
