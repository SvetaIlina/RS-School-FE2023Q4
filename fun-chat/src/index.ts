import App from './app/app';
import './style.css';

const url = 'ws://fun-chat-server-production-83cf.up.railway.app';
const app = new App(url);

app.init();
