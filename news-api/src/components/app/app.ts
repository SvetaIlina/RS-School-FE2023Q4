import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourcesResponse, INewsResponse } from '../../types/servise';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e) =>
                this.controller.getNews(e, (data: INewsResponse) => this.view.drawNews(data))
            );
        this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
