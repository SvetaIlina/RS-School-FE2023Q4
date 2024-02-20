import './sources.css';
import { ISources } from '../../../types/index';

class Sources {
    draw(data: ISources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp instanceof HTMLTemplateElement) {
            data.forEach((item: ISources) => {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
                    sourceClone.querySelector('.source__item-name')!.textContent = item.name;
                    sourceClone.querySelector('.source__item')!.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            });
        }

        document.querySelector('.sources')!.append(fragment);
    }
}

export default Sources;
