import EventBus from "./event-bus.js";

// Нельзя создавать экземпляр данного класса
class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render"
    };

    _element = null;
    _meta = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
        //eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps) { }

    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response)
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps, newProps) {
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

    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        // Это небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно компилировать не в строку (или делать это правильно),
        // либо сразу в превращать DOM-элементы и возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }

    // Переопределяется пользователем. Необходимо вернуть разметку
    render() { }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props) {
        // Еще один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {

                const oldTarget = {};
                oldTarget[prop] = target[prop];

                target[prop] = value;

                const newTarget = {};
                newTarget[prop] = target[prop];

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newTarget);

                return true;
            },
            deleteProperty(target, prop) {
                throw new Error("Нет доступа")
            }
        });
    }

    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;