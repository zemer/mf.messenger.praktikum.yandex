import { template } from "./template.js";
import Block from "../Block/index.js";
import { } from "handlebars";
import { IOwnMessageProps } from "./types.js";

export default class OwnMessage extends Block<IOwnMessageProps> {
    constructor(props: IOwnMessageProps) {
        super("div", props, "message message-own column-container body-font");
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 