import { template } from "./template.js";
import Block from "../Block/index.js";
import { IOwnMessageProps } from "./types.js";

export default class OwnMessage extends Block<IOwnMessageProps> {
    constructor(props: IOwnMessageProps) {
        super("div", props, "message message-own column-container body-font");
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 