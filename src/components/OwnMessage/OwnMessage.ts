import template from "./template";
import Block from "../Block/index";
import { IOwnMessageProps } from "./types";

export default class OwnMessage extends Block<IOwnMessageProps> {
    constructor(props: IOwnMessageProps) {
        super("div", props, "message message-own column-container body-font");
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
