import Controller from './controller';
import { isNotNull } from './servise/servise';
import { PageIds, messageType } from './type/type';

export default class MyWebSocket {
    url: string;
    ws: WebSocket | null;
    isOpen: boolean;
    onOpenCb: (isOpen: boolean) => void;
    onMessageCb: (e: MessageEvent) => void;
    constructor(url: string, onOpenCb: (isOpen: boolean) => void, onMessageCb: (e: MessageEvent) => void) {
        this.url = url;
        this.ws = null;
        this.isOpen = false;
        this.onOpenCb = onOpenCb;
        this.onMessageCb = onMessageCb;
        this.initWebSocket();
    }

    sendRequest(serverRequest: generalRequest) {
        isNotNull(this.ws);
        this.ws.send(JSON.stringify(serverRequest));
    }

    initWebSocket() {
        this.ws = new WebSocket(this.url);
        this.ws.addEventListener('open', () => this.onOpen(this.onOpenCb));

        this.ws.addEventListener('message', (e) => {
            this.onMessageCb(e);
        });
        this.ws.addEventListener('close', () => {
            this.onClose();
        });
    }

    onClose() {
        isNotNull(this.ws);
        this.ws.removeEventListener('open', () => this.onOpen(this.onOpenCb));
        this.ws.removeEventListener('close', () => this.onClose());
        this.ws.removeEventListener('message', (e) => this.onMessageCb(e));
        this.initWebSocket();
    }

    onOpen(cb: (isOpen: boolean) => void) {
        this.isOpen = true;
        cb(this.isOpen);
    }
}
