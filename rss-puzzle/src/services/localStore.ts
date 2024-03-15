// import { userData } from '../util/type';

export default class LocalStore {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    saveData<T>(data: T) {
        localStorage.setItem(`${this.key}`, JSON.stringify(data));
    }

    getData() {
        const data = localStorage.getItem(`${this.key}`);
        return data ? JSON.parse(data) : null;
    }

    removeData() {
        localStorage.removeItem(this.key);
    }
}
