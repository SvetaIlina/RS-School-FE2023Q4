import { EventEmitter } from 'events';
import loginPageView from '../pages/loginPage/loginPageView';
import startPageView from '../pages/startPage/startPageView';

const startPage = startPageView.getElement();

const myEmitter = new EventEmitter();
myEmitter.on('myEvent', () => {
    loginPageView.replaceCont(startPage);
});

export default myEmitter;
