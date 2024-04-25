import ChatData from './chatData';
import Controller from './controller';
import View from './view';

export default class App {
    private model: ChatData;

    private controller: Controller;

    private view: View;

    constructor(url: string) {
        this.model = new ChatData();
        this.view = new View();
        this.controller = new Controller(url, this.model, this.view);
    }

    init() {
        this.controller.init();
    }
}
