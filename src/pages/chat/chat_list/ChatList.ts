import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { items } from "../data.js";
import { IChatListProps } from "./types.js";
import Link from "../../../components/Link/index.js";

export default class ChatList extends Block<IChatListProps> {
    constructor() {
        const toProfile = new Link({
            text: "Профиль >",
            path: "/profile"
        });

        super("main", {
            items,
            toProfile
        }, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString()),
            toProfile: this.props.toProfile.renderToString()
        });

        return block;
    }
} 