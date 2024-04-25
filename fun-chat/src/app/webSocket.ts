import { isNotNull } from '../servise/servise';
import { ConnectMessage } from '../type/type';
import { generalRequest } from '../type/typeAPI';

export default class MyWebSocket {
    url: string;

    ws: WebSocket | null;

    isOpen: boolean;

    onOpenCb: (isOpen: boolean, message: string) => void;

    onCloseCb: (isOpen: boolean, message: string) => void;

    onMessageCb: (e: MessageEvent) => void;

    constructor(
        url: string,
        onOpenCb: (isOpen: boolean, message: string) => void,
        onMessageCb: (e: MessageEvent) => void,
        onCloseCb: (isOpen: boolean, message: string) => void
    ) {
        this.url = url;
        this.ws = null;
        this.isOpen = false;
        this.onOpenCb = onOpenCb;
        this.onCloseCb = onCloseCb;
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
            this.onClose(this.onCloseCb);
        });
    }

    onClose(cb: (isOpen: boolean, message: string) => void) {
        this.isOpen = false;
        isNotNull(this.ws);
        this.ws.removeEventListener('open', () => this.onOpen(this.onOpenCb));
        this.ws.removeEventListener('close', () => this.onClose(this.onCloseCb));
        this.ws.removeEventListener('message', (e) => this.onMessageCb(e));
        cb(this.isOpen, ConnectMessage.InProcess);
        this.initWebSocket();
    }

    onOpen(cb: (isOpen: boolean, message: string) => void) {
        this.isOpen = true;
        if (this.ws?.readyState === 1) {
            cb(this.isOpen, ConnectMessage.Ready);
        }
    }
}
