import App from './app/app';
import './style.css';

const url = 'ws://localhost:4000';
const app = new App(url);

app.init();
