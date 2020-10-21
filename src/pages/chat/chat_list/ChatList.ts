import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { items } from "../data.js";
import { IChatListProps } from "./types.js";

export default class ChatList extends Block<IChatListProps> {
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