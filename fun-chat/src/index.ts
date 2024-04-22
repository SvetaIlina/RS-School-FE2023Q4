import MainView from './view';
import './style.css';
import Controller from './controller';
import ChatData from './components/chat/chatData';

const data = new ChatData();
const view = new MainView();
const controller = new Controller('ws://localhost:4000', data, view);

controller.init();
