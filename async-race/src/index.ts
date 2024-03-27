import './style.css';

import HeaderView from './components/header/header';
import MainView from './components/main/main';

const main = new MainView();
const header = new HeaderView(main);

document.body.append(header.getViewElement(), main.getViewElement());
