import View from '../../view';
import BaseComponent from '../../baseComponent';
import Button from '../../buttons/button';

import './carOptions.css';

export default class CarOptions extends View {
    constructor(carName: string, deleteCb: () => Promise<void>, editCB: () => void) {
        super({
            tag: 'div',
            classes: ['carOptions'],
        });

        this.configView(carName, deleteCb, editCB);
    }

    configView(name: string, deleteCb: () => Promise<void>, editCB: () => void) {
        const raceBtnContainer = new BaseComponent({
            tag: 'div',
            classes: ['raceBtnContainer'],
        });
        const driveBtn = new Button(['startBtn', 'raceBtn'], '', () => console.log('start'));
        const stopBtn = new Button(['stopBtn', 'raceBtn'], '', () => console.log('stop'));
        raceBtnContainer.addChild([driveBtn, stopBtn]);
        const carName = new BaseComponent({
            tag: 'span',
            classes: ['carName'],
            textContent: name,
        });
        const carManage = new BaseComponent({
            tag: 'div',
            classes: ['carManage'],
        });
        const editBtn = new Button(['btn', 'carManageBtn'], 'Edit', editCB);
        const deleteBtn = new Button(['btn', 'carManageBtn'], 'Delete', () => deleteCb());
        carManage.addChild([editBtn, deleteBtn]);
        this.view.addChild([raceBtnContainer, carName, carManage]);
    }
}
