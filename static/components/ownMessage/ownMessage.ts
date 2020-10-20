import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class OwnMessage extends Block {
    constructor(props) {
        super("div", props, "message message-own column-container body-font");
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 