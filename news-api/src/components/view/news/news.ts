import './news.css';
import { INews } from '../../../types/index';

class News {
    draw(data: INews[]) {
        const news: INews[] = data.length >= 10 ? data.filter((_item: INews, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (newsItemTemp instanceof HTMLTemplateElement) {
            news.forEach((item: INews, idx: number) => {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof DocumentFragment) {
                    if (idx % 2) newsClone.querySelector('.news__item')!.classList.add('alt');

                    (newsClone.querySelector('.news__meta-photo') as HTMLElement)!.style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                    newsClone.querySelector('.news__meta-author')!.textContent = item.author || item.source.name;
                    newsClone.querySelector('.news__meta-date')!.textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');

                    newsClone.querySelector('.news__description-title')!.textContent = item.title;
                    newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
                    newsClone.querySelector('.news__description-content')!.textContent = item.description;
                    newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });
        }

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')!.appendChild(fragment);
    }
}

export default News;
