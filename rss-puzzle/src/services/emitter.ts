import { EventEmitter } from 'events';

import StartPageView from '../pages/startPage/startPageView';
import PageView from '../pages/pageView';

const myLoginPageEmitter = new EventEmitter();
myLoginPageEmitter.on('myEvent', (loginPage: HTMLElement) => {
    const startPage = new StartPageView(['startPage'], 'playerData');
    loginPage.replaceWith(startPage.getHTMLElement());
});

const myStartPageEmitter = new EventEmitter();
myStartPageEmitter.on('myStartEvent', (startPage: HTMLElement) => {
    const mainPage = new PageView().getHTMLElement();
    startPage.replaceWith(mainPage);
});

export { myLoginPageEmitter, myStartPageEmitter };
