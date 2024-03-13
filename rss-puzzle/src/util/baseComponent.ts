import { elemOptions, Callback, attribute } from './type';

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
    element: T;

    constructor(options: elemOptions) {
        this.element = document.createElement(options.tag) as T;
        this.setElement(options);
    }

    getElement() {
        return this.element;
    }

    setElement(options: elemOptions) {
        this.setStyles(options.classes);
        this.setTextContent(options.textContent);
        if (options.attributes) {
            this.setAttributes(options.attributes);
        }
        if (options.callback) {
            this.setCallback(options.callback);
        }
    }

    addChild(children: Array<HTMLElement | BaseComponent>) {
        children.forEach((child) => {
            if (child instanceof BaseComponent) {
                this.element.append(child.getElement());
            } else {
                this.element.append(child);
            }
        });
    }

    setStyles(cssClasses: Array<string>) {
        cssClasses.forEach((cssClass) => {
            if (cssClass) {
                this.element.classList.add(cssClass);
            }
        });
    }

    setAttributes(attributes: Array<attribute>) {
        attributes.forEach((attr) => {
            this.element.setAttribute(attr.key, attr.value);
        });
    }

    setTextContent(text: string) {
        this.element.textContent = text;
    }

    setCallback(cb: Callback<Event>) {
        if (typeof cb === 'function') {
            this.element.addEventListener('click', (event) => cb(event));
        }
    }
}
