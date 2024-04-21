import ChatData from './components/chat/chatData';
import Controller from './controller';
import { PageIds } from './type/type';

export default class Router {
    private manager: Controller;

    private currentPage: string;

    private chatData: ChatData;

    constructor(manager: Controller, chatData: ChatData) {
        this.manager = manager;
        this.chatData = chatData;
        window.addEventListener('hashchange', () => {
            this.locationHandler();
        });
        this.currentPage = '';
    }

    route(path: string) {
        window.location.hash = path;
        this.locationHandler();
    }

    locationHandler() {
        const hash = window.location.hash.slice(1);

        const isAuthenticated = this.chatData.isLogined;
        if (!isAuthenticated && hash === PageIds.MainPage) {
            window.location.hash = PageIds.LoginPage;

            alert('need log in');
            return;
        }
        if (this.currentPage === PageIds.MainPage && hash === PageIds.LoginPage && isAuthenticated) {
            window.location.hash = PageIds.MainPage;
        }
        this.manager.displayContent(hash);
        this.currentPage = hash;
    }
}
