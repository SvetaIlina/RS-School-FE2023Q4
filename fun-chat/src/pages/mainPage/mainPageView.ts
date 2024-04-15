import Header from '../../components/header/header';
import BasePage from '../basePage';

export default class mainPage extends BasePage {
    header: Header;
    constructor() {
        super();
        this.header = new Header(
            'sweta',
            'fun Chat',
            () => this.notifyObservers('logOut'),
            () => this.notifyObservers('showInfo')
        );
        this.addChild([this.header]);
    }
}
