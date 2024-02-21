import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: <T>(data: T) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: <T>(data: T) => void) {
        if (e.target instanceof HTMLElement) {
            let target: HTMLElement = e.target;
            const newsContainer: EventTarget | null = e.currentTarget;
            if (newsContainer instanceof HTMLElement) {
                while (target !== newsContainer) {
                    if (target.classList.contains('source__item')) {
                        const sourceId: string | null = target.getAttribute('data-source-id');
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            if (sourceId) {
                                newsContainer.setAttribute('data-source', sourceId);
                                super.getResp(
                                    {
                                        endpoint: 'everything',
                                        options: {
                                            sources: sourceId,
                                        },
                                    },
                                    callback
                                );
                            }
                        }
                        return;
                    }
                    if (target.parentNode && target.parentNode instanceof HTMLElement) {
                        target = target.parentNode;
                    }
                }
            }
        }
    }
}

export default AppController;
