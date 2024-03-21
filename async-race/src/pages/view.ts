import BaseComponent from '../components/baseComponent';
import { elemOptions } from '../type/types';

export default class View {
    view: BaseComponent;

    constructor(options: Pick<elemOptions, 'tag' | 'classes'>) {
        this.view = new BaseComponent({
            tag: options.tag,
            classes: options.classes,
            textContent: '',
        });
    }

    getViewElement() {
        return this.view.getElement();
    }
}
