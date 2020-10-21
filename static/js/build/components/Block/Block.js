import EventBus from "../../utils/event-bus.js";
// Нельзя создавать экземпляр данного класса
class Block {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props, classes = null) {
        this._id = 'uniq' + (Math.random() * 1000000);
        this._element = null;
        this._meta = null;
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
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
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    _createResources() {
        var _a, _b;
        const tagName = (_a = this._meta) === null || _a === void 0 ? void 0 : _a.tagName;
        this._element = this._createDocumentElement(tagName !== null && tagName !== void 0 ? tagName : 'div');
        if ((_b = this._meta) === null || _b === void 0 ? void 0 : _b.classes)
            this._element.className = this._meta.classes;
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
    getProps() {
        return this.props;
    }
    get element() {
        return this._element;
    }
    setElement(element) {
        this._element = element;
        this.setEvents();
    }
    setEvents() {
    }
    handleFocus() {
    }
    _render() {
        const block = this.render();
        if (this._element)
            this._element.innerHTML = block;
    }
    render() { return ''; }
    renderToString() {
        var _a, _b;
        const wrapper = document.createElement((_b = (_a = this._meta) === null || _a === void 0 ? void 0 : _a.tagName) !== null && _b !== void 0 ? _b : 'div');
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
    _makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                return Reflect.get(target, prop);
            },
            set(target, prop, value) {
                const oldTarget = new Object();
                Object.assign(oldTarget, target);
                Reflect.set(target, prop, value);
                const newTarget = new Object();
                Object.assign(oldTarget, target);
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, newTarget);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }
    _createDocumentElement(tagName) {
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
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
};
Block._instances = [];
Block.hydrate = function () {
    for (const i of Block._instances) {
        const id = i.getId();
        const elements = document.querySelectorAll(`[_key="${id}"]`);
        if (elements && elements.length == 1) {
            i.setElement(elements[0]);
        }
    }
};
export default Block;
//# sourceMappingURL=Block.js.map