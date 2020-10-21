import { template } from "./template.js";
import Block from "../Block/index.js";
import { } from "handlebars";
import ErrorHelper from "../ErrorHelper/index.js";

export default class Input extends Block {
    errorHelper: ErrorHelper;
    value: string | null;

    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";

        super("div", {
            ...props
        });

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);

        this.errorHelper = new ErrorHelper({});
    }

    componentDidMount(oldProps) {
        super.componentDidMount(oldProps);

        this.setProps({
            ...this.props,
            errorHelper: this.errorHelper
        })
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

    checkValidation(value: string | null): string | null {
        return null;
    }
} 