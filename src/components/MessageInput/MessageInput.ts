import Block from "../Block/Block.js";
import ErrorHelper from "../ErrorHelper/ErrorHelper.js";
import { template } from "./template.js";

export default class MessageInput extends Block {
    errorHelper: ErrorHelper;
    value: string | null;

    constructor(props) {
        super("div", props);

        this.errorHelper = new ErrorHelper({});

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount(oldProps) {
        super.componentDidMount(oldProps);

        this.setProps({
            ...this.props,
            errorHelper: this.errorHelper
        })
    }

    checkValidation(value: string | null): string | null {
        if (!value)
            return "Поле не может быть пустым";

        return null;
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            ...this.props,
            errorHelper: this.errorHelper?.renderToString()
        });

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

    handleInput(ev: Event) {
        this.value = (ev.target as HTMLInputElement)?.value;
    }

    validate() {
        const message = this.checkValidation(this.value);
        this.errorHelper.showOnError(message);
    }
}