import './style.css';

import HeaderElement from './components/header/header';
import MainElement from './components/main/main';

const main: MainElement = new MainElement();
const header: HeaderElement = new HeaderElement(main);

document.body.append(header.getElement(), main.getElement());
