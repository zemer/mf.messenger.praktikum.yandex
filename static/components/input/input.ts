import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";
import ErrorHelper from "../ErrorHelper/ErrorHelper.js";

export default class Input extends Block {
    errorHelper: ErrorHelper;

    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";

        super("div", props);

        this.errorHelper = new ErrorHelper({});

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
        }
    }

    handleFocus(ev: FocusEvent) {
        const message = this.checkValidation(ev);
        this.errorHelper.showOnError(message);
    }

    handleBlur(ev: FocusEvent) {
        const message = this.checkValidation(ev);
        this.errorHelper.showOnError(message);
    }

    checkValidation(ev: FocusEvent): string | null {
        return null;
    }
} 