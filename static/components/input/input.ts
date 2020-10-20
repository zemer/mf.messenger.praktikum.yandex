import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class Input extends Block {
    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";

        super("div", props);
    }

    componentDidMount(oldProps) {
        super.componentDidMount(oldProps);

        //if (this.element)
        //    this.element.addEventListener('change', this.props.handleChange);
    }

    private onFocus(ev: FocusEvent) {
        console.log('onFocus', ev);
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener('focus', this.props.handleFocus, true)
            this._element.addEventListener('blur', this.props.handleBlur, true)
        }
    }
} 