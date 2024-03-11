import { EventEmitter } from 'events';
import loginPageView from '../pages/loginPage/loginPageView';
import BaseComponent from '../util/baseComponent';

const newCont = new BaseComponent({
    tag: 'h1',
    classes: [''],
    textContent: 'GGGGGGGGGGGGGGGGG',
}).getElement();

const myEmitter = new EventEmitter();
myEmitter.on('myEvent', () => {
    loginPageView.replaceCont(newCont);
});

export default myEmitter;
