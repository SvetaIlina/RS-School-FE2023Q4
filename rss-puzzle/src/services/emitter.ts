import { EventEmitter } from 'events';

import StartPageView from '../pages/startPage/startPageView';

const myEmitter = new EventEmitter();
myEmitter.on('myEvent', (loginPage: HTMLElement) => {
    const startPage = new StartPageView(['startPage'], 'playerData');
    loginPage.replaceWith(startPage.getHTMLElement());
});

export default myEmitter;
