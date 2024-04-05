import BaseComponent from '../components/baseComponent';
import GargeView from '../components/main/garage/garage';
import WinnersView from '../components/main/winners/winners';

export type Callback<T> = (argument: T) => void;

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<{ key: string; value: string }>;
    textContent?: string;
    onClick?: Callback<Event>;
    eventType?: string;
};

export type mainsChild = GargeView | WinnersView;

export type mainContent = {
    title: BaseComponent<HTMLElement>;
    carsWrapper: BaseComponent<HTMLElement>;
};

export type apiParams = {
    page: number | '';
    limit: number | '';
};

export type carInfo = {
    name: string;
    color: string;
    id: number;
};

export type carData = Pick<carInfo, 'name' | 'color'>;

export interface CarsResponse {
    info: Array<carInfo>;
    membersCount: number | null;
}

export type winnerCar = {
    id: number;
    wins: number;
    time: number;
};
export interface WinnerResponse {
    info: Array<winnerCar>;
    membersCount: number | null;
}

export type winnerData = carInfo & {
    time: string;
};

export type raceParams = {
    velocity: number;
    distance: number;
};
