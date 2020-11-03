import EventBus from "../../utils/event-bus.js";
import { isEqual } from "../../utils/isEqual.js";

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
    static hydrate = function (root: HTMLElement | HTMLDocument = document) {
        for (const i of Block._instances) {
            const id = i.getId();
            const elements = root.querySelectorAll(`[_key="${id}"]`);

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

        if (this._meta?.classes) {
            this._element.className = this._meta.classes;
        }

        this._element.setAttribute('_key', this.getId());
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {
    }

    _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: T, newProps: T) {
        return !isEqual(oldProps, newProps);
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
        if (this._element) {
            this._element.innerHTML = block;
        }
    }

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
        const self = this;

        return new Proxy<T>(props, {
            get(target, prop) {
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                const oldTarget = new Object();
                Object.assign(oldTarget, target);

                Reflect.set(target, prop, value);

                const newTarget = new Object();
                Object.assign(newTarget, target);

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newTarget);

                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа")
            }
        });
    }

    _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show() {
        const element = this.getContent();
        if (element) {
            element.style.display = "block";
        }
    }

    hide() {
        const element = this.getContent();
        if (element) {
            element.style.display = "none";
        }
    }
}

export default Block;