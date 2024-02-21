import News from './news/news';
import Sources from './sources/sources';
import { INewsResponse, ISourcesResponse, INews, ISources } from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsResponse) {
        const values: INews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISourcesResponse) {
        const values: ISources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
