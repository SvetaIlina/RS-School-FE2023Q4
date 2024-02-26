import './news.css';
import { INews, getEl, isNotNull } from '../../../types/servise';
import Placeholder from './img/news_placeholder.jpg';

class News {
    draw(data: INews[]) {
        const news: INews[] = data.length >= 10 ? data.filter((_item: INews, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp instanceof HTMLTemplateElement) {
            news.forEach((item: INews, idx: number) => {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) getEl('.news__item', newsClone).classList.add('alt');

                    getEl('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                        item.urlToImage || Placeholder
                    })`;
                    getEl('.news__meta-author', newsClone).textContent = item.author || item.source.name;
                    getEl('.news__meta-date', newsClone).textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');

                    getEl('.news__description-title', newsClone).textContent = item.title;
                    getEl('.news__description-source', newsClone).textContent = item.source.name;
                    getEl('.news__description-content', newsClone).textContent = item.description;
                    getEl('.news__read-more a', newsClone).setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });
        }
        const elem = document.querySelector('.news');
        isNotNull(elem);
        elem.innerHTML = '';
        elem.appendChild(fragment);
    }
}

export default News;
