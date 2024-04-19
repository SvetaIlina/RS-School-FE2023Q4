import ChatData from './components/chat/chatData';
import { isNotNull } from './servise/servise';
import { ConnectMessage } from './type/type';
import MainView from './view';

export default class Controller {
    private model: ChatData;
    private view: MainView;
    private isOpen: boolean;
    url: string;
    ws: WebSocket | null;
    constructor(url: string, model: ChatData, view: MainView) {
        this.model = model;
        this.view = view;
        this.url = url;
        this.isOpen = false;
        this.ws = null;
    }

    initWebSocket() {
        this.view.showModal(ConnectMessage.InProcess);
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', () => this.onOpen());

        this.ws.addEventListener('message', () => {});
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
}
