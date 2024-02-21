export interface INews {
    urlToImage: string;
    author: string;
    source: { name: string; id: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    content: string;
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: INews[];
}

export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourcesResponse {
    status: string;
    sources: ISources[];
}

export enum StatusCode {
    unauthorized = 401,
    notFound = 404,
}
