import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(
            {
                apiKey: process.env.API_KEY,
            },
            process.env.API_URL
        );
    }
}

export default AppLoader;
