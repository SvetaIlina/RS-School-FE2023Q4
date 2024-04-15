import { PageIds } from './type/type';
import MainView from './view';

export default class Router {
    private storageKey: string = 'myUser';
    private manager: MainView;
    constructor(pageManager: MainView) {
        this.manager = pageManager;
        window.addEventListener('hashchange', () => {
            this.locationHandler();
        });
    }
    init() {
        let hash;
        this.checkUser(this.storageKey) ? (hash = PageIds.MainPage) : (hash = window.location.hash);

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
        }
        this.manager.setContent(hash);
    }

    checkUser(key: string): boolean {
        return sessionStorage.getItem(key) ? true : false;
    }
}
