import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { } from "handlebars";
import { items } from "../data.js";

export default class ChatList extends Block {
    constructor() {
        super("main", {
            items
        }, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString())
        });

        return block;
    }
} 