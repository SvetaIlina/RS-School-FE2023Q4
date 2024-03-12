import PageView from '../pageView';
import BaseComponent from '../../util/baseComponent';
import './startPageStyles.css';

import img from '../../assets/images/sq.png';

const startPageView = new PageView('startPage');
const gameName = new BaseComponent({
    tag: 'h1',
    classes: ['title'],
    textContent: 'Welcome to RSS English Puzzle Game',
});
const gameDescr = new BaseComponent({
    tag: 'p',
    classes: ['descr'],
    textContent:
        "An exciting sentence-creation adventure in which your linguistic prowess  is your greatest asset!  Make sentences out of words by dragging them or clicking on them. Use the hints if you encounter difficulties. You can choose the level - from simple phrases to complex expressions. Challenge yourself and conquer the language landscape. It's not just a game, it's a journey through the limitless possibilities of language!",
});

const image = new BaseComponent({
    tag: 'img',
    classes: ['img'],
    textContent: '',
}).getElement();
image.setAttribute('src', `${img}`);

startPageView.addChild(gameName.getElement());
startPageView.addChild(gameDescr.getElement());
startPageView.addChild(image);

export default startPageView;
