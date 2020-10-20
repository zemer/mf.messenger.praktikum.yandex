import Block from "../block/block.js";
import ErrorHelper from "../ErrorHelper/ErrorHelper.js";
import { template } from "./template.js";
export default class MessageInput extends Block {
    constructor(props) {
        super("div", props);
        this.errorHelper = new ErrorHelper({});
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount(oldProps) {
        super.componentDidMount(oldProps);
        this.setProps(Object.assign(Object.assign({}, this.props), { errorHelper: this.errorHelper }));
    }
    checkValidation(value) {
        if (!value)
            return "Поле не может быть пустым";
        return null;
    }
    render() {
        var _a;
        const compile = Handlebars.compile(template);
        const block = compile(Object.assign(Object.assign({}, this.props), { errorHelper: (_a = this.errorHelper) === null || _a === void 0 ? void 0 : _a.renderToString() }));
        return block;
    }
    setEvents() {
        if (this._element) {
            this._element.addEventListener('focus', this.handleFocus, true);
            this._element.addEventListener('blur', this.handleBlur, true);
            this._element.addEventListener('input', this.handleInput);
        }
    }
    handleFocus() {
        this.validate();
    }
    handleBlur() {
        this.validate();
    }
    handleInput(ev) {
        var _a;
        this.value = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.value;
    }
    validate() {
        const message = this.checkValidation(this.value);
        this.errorHelper.showOnError(message);
    }
}
//# sourceMappingURL=MessageInput.js.map