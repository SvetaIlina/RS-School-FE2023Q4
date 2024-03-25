import InputOptions from '../../../input/inputOptions';
import Button from '../../../buttons/button';
import BaseComponent from '../../../baseComponent';
import './garageOption.css';

export default class GarageOptions extends BaseComponent {
    constructor() {
        super({
            tag: 'div',
            classes: ['garageOption'],
        });
        this.configView();
    }

    configView() {
        const newCarOption = new BaseComponent({
            tag: 'div',
            classes: ['option', 'newCarOption'],
        });
        const editCarOption = new BaseComponent({
            tag: 'div',
            classes: ['option', 'editCarOption', 'disable'],
        });
        const newCarInput = new InputOptions();
        const editCarInput = new InputOptions();
        const createCarBtn = new Button(['btn'], 'Create', () => console.log('createCar'));
        const updataCarBtn = new Button(['btn'], 'Update', () => console.log('updataCar'));
        newCarOption.addChild([newCarInput, createCarBtn]);
        editCarOption.addChild([editCarInput, updataCarBtn]);
        this.addChild([newCarOption, editCarOption]);
    }
}
