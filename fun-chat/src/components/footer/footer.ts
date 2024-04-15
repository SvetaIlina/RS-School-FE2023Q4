import BaseComponent from '../baseComponent';
import './footer.css';
import img from '../../assets/image/rs_school_js.svg';
import myLink from '../myLink';

export default class Footer extends BaseComponent {
    constructor() {
        super({ tag: 'footer', classes: ['footer'] });
        this.configView();
    }

    configView() {
        const schoolImg = new BaseComponent({
            tag: 'img',
            classes: ['footer_img'],
            attributes: [{ key: 'src', value: `${img}` }],
        });
        const year = new BaseComponent({
            tag: 'span',
            classes: ['footer_item'],
            textContent: '2024',
        });
        this.addChild([schoolImg, myLink, year]);
    }
}
