import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasePage from '../basePage';

export default class mainPage extends BasePage {
    header: Header;
    footer: Footer;
    constructor() {
        super();
        this.header = new Header(
            'sweta',
            'fun Chat',
            () => this.notifyObservers('logOut'),
            () => this.notifyObservers('showInfo')
        );
        this.footer = new Footer();
        this.addChild([this.header, this.footer]);
    }
}
