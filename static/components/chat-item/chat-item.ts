import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class ChatItem extends Block {
    constructor(props) {
        super("section", props);
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 