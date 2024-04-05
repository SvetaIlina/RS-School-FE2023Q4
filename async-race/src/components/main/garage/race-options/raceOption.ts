import BaseComponent from '../../../baseComponent';
import GargeView from '../garage';
import Button from '../../../buttons/button';
import { isNotNull, toggleBtn } from '../../../../servise/servise';
import './raceOpt.css';

export default class RaceOptions extends BaseComponent {
    private observer: GargeView | null;

    constructor() {
        super({
            tag: 'div',
            classes: ['raceOption'],
        });

        this.observer = null;
        this.configView();
    }

    addObserver(observer: GargeView): void {
        this.observer = observer;
    }

    configView(): void {
        const startRaceBtn = new Button(['btn', 'raceOptionBtn', 'startRace'], 'start race', (e) =>
            this.handleStartRace(e)
        );
        const resetRaceBtn = new Button(['btn', 'raceOptionBtn', 'resetRace', 'disable'], 'reset', (e) =>
            this.handleResetRace(e)
        );

        this.addChild([startRaceBtn, resetRaceBtn]);
    }

    handleStartRace(e: Event): void {
        isNotNull(e.target);
        toggleBtn(e.target);
        isNotNull(this.observer);
        this.observer.startRace();
    }

    handleResetRace(e: Event): void {
        isNotNull(e.target);
        toggleBtn(e.target);
        isNotNull(this.observer);
        this.observer.resetRace();
    }
}
