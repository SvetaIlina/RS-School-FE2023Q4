import './sources.css';
import { ISources, isNotNull, getEl } from '../../../types/servise';

class Sources {
    draw(data: ISources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp instanceof HTMLTemplateElement) {
            data.forEach((item: ISources) => {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
                    getEl('.source__item-name', sourceClone).textContent = item.name;
                    getEl('.source__item', sourceClone).setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            });
        }

        const elem = document.querySelector('.sources');
        isNotNull(elem);
        elem.append(fragment);
    }
}

export default Sources;
