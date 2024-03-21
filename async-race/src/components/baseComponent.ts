import { Callback, elemOptions } from '../type/types';

export default class BaseComponent<T extends HTMLElement = HTMLElement> {
    element: T;

    constructor(options: elemOptions, ...childs: Array<BaseComponent | HTMLElement>) {
        this.element = document.createElement(options.tag) as T;
        this.setElement(options);
        if (childs) {
            this.addChild(childs);
        }
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
        if (options.onClick && options.eventType) {
            this.setCallback(options.onClick, options.eventType);
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

    removeChild() {
        while (this.element.firstChild) {
            this.element.firstChild.remove();
        }
    }

    setStyles(cssClasses: Array<string>) {
        cssClasses.forEach((cssClass) => {
            if (cssClass) {
                this.element.classList.add(cssClass);
            }
        });
    }

    setAttributes(attributes: Array<{ key: string; value: string }>) {
        attributes.forEach((attr) => {
            this.element.setAttribute(attr.key, attr.value);
        });
    }

    setTextContent(text: string) {
        this.element.textContent = text;
    }

    setCallback(cb: Callback<Event>, eventType: string) {
        if (typeof cb === 'function') {
            this.element.addEventListener(eventType, cb);
        }
    }
}
