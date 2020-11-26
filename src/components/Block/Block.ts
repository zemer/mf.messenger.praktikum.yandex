import EventBus from "Utils/event-bus";
import isEqual from "Utils/isEqual";
import { PlainObject } from "Common/commonTypes";

interface IMetaInfo<T> {
    tagName: string;
    classes: string | null,
    props: T;
}

// Нельзя создавать экземпляр данного класса
class Block<T extends PlainObject> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };

    static instances: Block<any>[] = [];

    static hydrate = (root: HTMLElement | HTMLDocument = document) => {
        for (const i of Block.instances) {
            const id = i.getId();
            const elements = root.querySelectorAll(`[_key="${id}"]`);

            if (elements && elements.length === 1) {
                i.setElement(elements[0] as HTMLElement);
            }
        }
    };

    id = `uniq${Math.random() * 1000000}`;

    props: T;

    visible: boolean | null;

    blockElement: HTMLElement | null = null;

    blockMeta: IMetaInfo<T> | null = null;

    eventBus: () => EventBus;

    // private _subscriptions: Map<any, any> = new Map();

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props: T, classes: string | null = null, visible: boolean | null = null) {
        const eventBus = new EventBus();

        this.blockMeta = {
            tagName,
            classes,
            props
        };

        this.props = this.makePropsProxy(props);
        this.visible = visible;

        this.eventBus = () => eventBus;

        this.registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        Block.instances.push(this);
    }

    registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this.blockComponentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this.blockRender.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this.blockComponentDidUpdate.bind(this));
    }

    createResources() {
        const tagName = this.blockMeta?.tagName;
        this.blockElement = this.createDocumentElement(tagName ?? "div");

        if (this.blockMeta?.classes) {
            this.blockElement.className = this.blockMeta.classes;
        }

        this.blockElement.setAttribute("_key", this.getId());
    }

    init() {
        this.createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    blockComponentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() {
    }

    blockComponentDidUpdate(oldProps: T, newProps: T): void {
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
        return this.blockElement;
    }

    setElement(element: HTMLElement) {
        this.blockElement = element;
        this.doAfterRender();

        if (this.visible === true) {
            this.show();
        } else if (this.visible === false) {
            this.hide();
        }
    }

    doAfterRender(): void {
    }

    handleFocus(): void {
    }

    blockRender(): void {
        const block = this.render();
        if (this.blockElement) {
            this.blockElement.innerHTML = block;
            Block.hydrate();
            this.doAfterRender();
        }
    }

    render(): string { return ""; }

    renderToString(): string {
        const wrapper = document.createElement("div");

        if (this.blockElement) {
            this.blockElement.innerHTML = this.render();
            wrapper.appendChild(this.blockElement);

            Block.hydrate();
            this.doAfterRender();
        }

        return wrapper.innerHTML;
    }

    getId(): string {
        return this.id;
    }

    getContent(): HTMLElement | null {
        return this.element;
    }

    makePropsProxy(props: T): T {
        const self = this;

        return new Proxy<T>(props, {
            get(target, prop) {
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                const oldTarget = {};
                Object.assign(oldTarget, target);

                Reflect.set(target, prop, value);

                const newTarget = {};
                Object.assign(newTarget, target);

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newTarget);

                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    show(): void {
        this.visible = true;

        const element = this.getContent();
        if (element) {
            element.style.display = "block";
        }
    }

    hide(): void {
        this.visible = false;

        const element = this.getContent();
        if (element) {
            element.style.display = "none";
        }
    }
}

export default Block;
