export type Callback<T> = (argument: T) => void;

export type elemOptions = {
    tag: string;
    classes: Array<string>;
    attributes?: Array<{ key: string; value: string }>;
    textContent?: string;
    onClick?: Callback<Event>;
    eventType?: string;
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

export interface InfoResponse {
    info: Array<carInfo>;
    carCount: number | null;
}
