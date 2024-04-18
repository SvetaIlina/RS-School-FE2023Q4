import { PageIds } from './type/type';
import MainView from './view';

export default class Router {
    private storageKey: string = 'myUser';
    private manager: MainView;
    private currentPage: string;
    constructor(pageManager: MainView) {
        this.manager = pageManager;
        window.addEventListener('hashchange', () => {
            this.locationHandler();
        });
        this.currentPage = '';
    }
    init() {
        let hash;
        this.checkUser(this.storageKey) ? (hash = PageIds.MainPage) : (hash = PageIds.LoginPage);
        this.route(hash);
    }

    route(path: string) {
        window.location.hash = path;
        this.locationHandler();
    }

    locationHandler() {
        let hash = window.location.hash.slice(1);

        const isAuthenticated = this.checkUser(this.storageKey);
        if (!isAuthenticated && hash === PageIds.MainPage) {
            window.location.hash = PageIds.LoginPage;

            alert('need log in');
            return;
        }
        if (this.currentPage === PageIds.MainPage && hash === PageIds.LoginPage && isAuthenticated) {
            window.location.hash = PageIds.MainPage;
        }
        this.manager.setContent(hash);
        this.currentPage = hash;
    }

    checkUser(key: string): boolean {
        return sessionStorage.getItem(key) ? true : false;
    }
}
