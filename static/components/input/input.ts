import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class Input extends Block {
    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";

        super("div", props);

        console.log(props);
    }

    componentDidMount(oldProps) {
        super.componentDidMount(oldProps);

        console.log(1, this.element);

        this.element?.addEventListener('click', this.props.click);
    }

    private onFocus(ev: FocusEvent) {
        console.log('onFocus', ev);
    }

    render() {
        const compiled = Handlebars.compile(template);
        const result = compiled(this.props);

        const element = this.element;
        if (element) {
            element.innerHTML = result;
        }

        return element?.outerHTML ?? "";
    }
} 