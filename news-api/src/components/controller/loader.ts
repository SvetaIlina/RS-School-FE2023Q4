import { StatusCode } from '../../types/servise';

class Loader {
    private baseLink: string | undefined;
    private options: Record<string, string | undefined>;
    constructor(baseLink: string | undefined, options: Record<string, string | undefined>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        {
            endpoint,
            options,
        }: {
            endpoint: string;
            options?: {
                sources: string;
            };
        },
        callback = (data: T): void => {
            if (!data) {
                console.error('No callback for GET response');
            }
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === StatusCode.unauthorized || res.status === StatusCode.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string) {
        if (!Object.values(this.options)[0] || !this.baseLink) {
            throw new Error('errror');
        }
        const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: (data: T) => void,
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
