import { template } from "./template.js";
import Block from "../block.js";
import { } from "handlebars";

export default class Input extends Block {
    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";

        super("div", props);
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 