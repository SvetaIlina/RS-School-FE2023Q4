import { INewsResponse, ISourcesResponse } from '../../types/index';
class Loader {
    private baseLink: string;
    private options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        {
            endpoint,
            options,
        }: {
            endpoint: string;
            options: {
                sources?: string;
            };
        },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, string>, endpoint: string) {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: INewsResponse | ISourcesResponse) => void,
        options: Record<string, string> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: INewsResponse | ISourcesResponse) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
