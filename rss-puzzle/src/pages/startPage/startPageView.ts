import PageView from '../pageView';
import BaseComponent from '../../util/baseComponent';
import img from '../../assets/images/sq.png';
import LocalStore from '../../services/localStore';
import { userData } from '../../util/type';
import './startPageStyles.css';

export default class StartPageView extends PageView {
    private image = new BaseComponent({
        tag: 'img',
        classes: ['img'],
        textContent: '',
        attributes: [{ key: 'src', value: `${img}` }],
    });

    private gameDescr = new BaseComponent({
        tag: 'p',
        classes: ['descr'],
        textContent:
            "An exciting sentence-creation adventure in which your linguistic prowess  is your greatest asset!  Make sentences out of words by dragging them or clicking on them. Use the hints if you encounter difficulties. You can choose the level - from simple phrases to complex expressions. Challenge yourself and conquer the language landscape. It's not just a game, it's a journey through the limitless possibilities of language!",
    });

    private gameName = new BaseComponent({
        tag: 'h1',
        classes: ['title'],
        textContent: 'Welcome to RSS English Puzzle Game',
    });

    localStorageKey: string;

    constructor(cssClass: Array<string>, localStorageKey: string) {
        super();
        this.localStorageKey = localStorageKey;
        this.viewPage.setStyles(cssClass);
        this.viewPage.addChild([this.image, this.gameName, this.gameDescr]);
        this.viewPage.getElement().insertAdjacentElement('afterbegin', this.setGreetingMessage());
    }

    setGreetingMessage() {
        const storage = new LocalStore(this.localStorageKey);
        const data: userData = storage.getData();
        let name: string = 'New';
        let surName: string = 'player';
        if (data) {
            name = data.name;
            surName = data.surName;
        }

        const title = new BaseComponent({
            tag: 'h1',
            classes: ['title'],
            textContent: `Hello, ${name} ${surName} !`,
        });
        return title.getElement();
    }
}
