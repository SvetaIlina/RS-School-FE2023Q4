import ChatData from './components/chat/chatData';
import Router from './router';
import { checkServerData, isNotNull } from './servise/servise';
import { ConnectMessage, PageIds, messageType } from './type/type';
import { generalRequest, errorResponse, thirdPartyUser, currentUser, receivedMessage } from './type/typeAPI';
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
        this.view.showModal(ConnectMessage.InProcess);
        this.ws.initWebSocket();
    }

    handleWebSocketOnopen(isOpen: boolean, message: string): void {
        this.goToPage();
        this.view.showModal(message, isOpen);
    }

    handleWebSocketOnClose(isOpen: boolean, message: string) {
        this.view.showModal(message, isOpen);
    }

    handleWebSocketMessage(e: MessageEvent) {
        const dataFromServer: generalRequest | errorResponse = JSON.parse(e.data);
        const { type } = dataFromServer;

        switch (type) {
            case messageType.Login: {
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
                this.getUsers.call(this, messageType.InactiveUser);
                const data = checkServerData(dataFromServer, 'users');
                if (Array.isArray(data)) {
                    const users = data as thirdPartyUser[];
                    this.model.ActiveUser = users;
                }

                break;
            }
            case messageType.InactiveUser: {
                const data = checkServerData(dataFromServer, 'users');
                if (Array.isArray(data)) {
                    const users = data as thirdPartyUser[];
                    this.model.inActiveUser = users;
                    isNotNull(this.model.myUser);
                    this.authorizeUser(this.model.myUser);
                }

                break;
            }
            case messageType.AnotherUserLogin:
            case messageType.AnotherUserLogout: {
                const user = checkServerData(dataFromServer, 'user') as thirdPartyUser;
                this.model.changeUserStatus(user);

                this.view.updateUserStatus(user);

                break;
            }
            case messageType.SendMSG: {
                const message = checkServerData(dataFromServer, 'message') as receivedMessage;
                const messageDraft = this.model.checkMessage(message);
                if (this.model.currentContact) {
                    const contact = this.model.currentContact.login;
                    isNotNull(this.model.myUser);
                    if (contact === message.from || message.from === this.model.myUser.login) {
                        this.view.addMessage(messageDraft);
                    } else {
                        this.view.setUnreadMessage(message.from);
                    }
                } else {
                    this.view.setUnreadMessage(message.from);
                }

                break;
            }
            case messageType.Error: {
                const errorMessage = checkServerData(dataFromServer, 'error');
                if (typeof errorMessage === 'string') {
                    this.view.showModal(errorMessage, this.ws.isOpen);
                }

                break;
            }
            default: {
                console.log('nothing');
            }
        }
    }

    update(action: string, data?: string) {
        switch (action) {
            case 'login': {
                isNotNull(data);
                const user = JSON.parse(data);
                this.model.myUser = user;
                this.getUsers.call(this, messageType.ActiveUser);

                break;
            }
            case 'showInfo': {
                this.router.route(PageIds.InfoPage);
                break;
            }
            case 'logOut': {
                this.userLogout();
                break;
            }
            case 'contactSelected': {
                isNotNull(data);
                this.model.setCurrentContact(data);
                isNotNull(this.model.currentContact);
                this.view.setUserContact(this.model.currentContact);
                break;
            }
            case 'sendMessage': {
                isNotNull(data);
                if (this.model.currentContact) {
                    const serverRequest: generalRequest = {
                        id: crypto.randomUUID(),
                        type: 'MSG_SEND',
                        payload: {
                            message: {
                                to: this.model.currentContact.login,
                                text: data,
                            },
                        },
                    };
                    this.ws.sendRequest(serverRequest);
                }
                break;
            }
            default: {
                console.log('nothing');
            }
        }
    }

    displayContent(hash: string) {
        if (this.model.myUser) {
            const name = this.model.myUser.login;

            const contact = this.model.getAllContact();

            this.view.createPage(hash, name, contact);
        } else {
            this.view.createPage(hash);
        }
    }

    authorizeUser(user: currentUser) {
        const alreadyLogined = this.model.checkLogginedUser();
        if (!alreadyLogined) {
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

    getUsers(userStatus: string) {
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

    goToPage() {
        const UserLogin = this.model.checkSavedUser();
        if (UserLogin) {
            this.getUsers.call(this, messageType.ActiveUser);
        } else {
            this.router.route(PageIds.LoginPage);
        }
    }
}
