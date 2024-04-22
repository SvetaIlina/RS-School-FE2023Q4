import { userStatus } from '../../../../type/type';
import { thirdPartyUser } from '../../../../type/typeAPI';
import BaseComponent from '../../../baseComponent';
import './dialogHeader.css';

export default class DialogHeader extends BaseComponent {
    private userName: BaseComponent = new BaseComponent({
        tag: 'span',
        classes: ['dialog_header-name'],
    });

    private userStatus: BaseComponent = new BaseComponent({
        tag: 'span',
        classes: ['dialog_header-status'],
    });

    constructor() {
        super({
            tag: 'div',
            classes: ['dialog_header'],
        });

        this.addChild([this.userName, this.userStatus]);
    }

    setUserValue(user: thirdPartyUser) {
        let status: string;
        this.userName.setTextContent(user.login);
        if (user.isLogined) {
            status = userStatus.OnLine;
            this.setStyles(['active']);
        } else {
            status = userStatus.OffLine;
            this.getElement().classList.remove('active');
        }
        this.userStatus.setTextContent(status);
    }
}
