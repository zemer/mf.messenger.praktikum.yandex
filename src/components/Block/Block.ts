import EventBus from "../../utils/event-bus.js";
import { IBlockProps } from "./types.js";

interface IMetaInfo<T> {
    tagName: string;
    classes: string | null,
    props: T;
}

// Нельзя создавать экземпляр данного класса
class Block<T extends object> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    static _instances: Block<any>[] = [];
    static hydrate = function () {
        for (const i of Block._instances) {
            const id = i.getId();
            const elements = document.querySelectorAll(`[_key="${id}"]`);

            if (elements && elements.length == 1) {
                i.setElement(elements[0] as HTMLElement);
            }
        }
    }

    _id = 'uniq' + (Math.random() * 1000000);
    props: T;
    _element: HTMLElement | null = null;
    _meta: IMetaInfo<T> | null = null;
    eventBus: () => EventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props: T, classes: string | null = null) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            classes,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        Block._instances.push(this);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const tagName = this._meta?.tagName;
        this._element = this._createDocumentElement(tagName ?? 'div');

        if (this._meta?.classes)
            this._element.className = this._meta.classes;

        this._element.setAttribute('_key', this.getId());
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps: T) { }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response)
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        for (const key in oldProps) {
            if (newProps.hasOwnProperty(key)) {
                const oldValue = oldProps[key];
                const newValue = newProps[key];

                if (oldValue !== newValue)
                    return true;
            }
            else {
                return true;
            }
        }

        return false;
    }

    getProps() {
        return this.props;
    }

    setProps = (nextProps: T) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    setElement(element: HTMLElement) {
        this._element = element;
        this.setEvents();
    }

    setEvents() {
    }

    handleFocus() {
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу в превращать DOM-элементы и возвращать из compile DOM-ноду
        if (this._element)
            this._element.innerHTML = block;
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render(): string { return ''; }

    renderToString() {
        const wrapper = document.createElement(this._meta?.tagName ?? 'div');

        if (this._element) {
            this._element.innerHTML = this.render();
            wrapper.appendChild(this._element);
        }

        return wrapper.innerHTML;
    }

    getId() {
        return this._id;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: T) {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy<T>(props, {
            get(target, prop) {
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                const oldTarget = new Object();
                Object.assign(oldTarget, target);
                //oldTarget[prop] = target[prop];

                //target[prop] = value;

                Reflect.set(target, prop, value);

                const newTarget = new Object();
                Object.assign(oldTarget, target);

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newTarget);

                return true;
            },
            deleteProperty(target, prop) {
                throw new Error("Нет доступа")
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        const element = this.getContent();
        if (element)
            element.style.display = "block";
    }

    hide() {
        const element = this.getContent();
        if (element)
            element.style.display = "none";
    }
}

export default Block;