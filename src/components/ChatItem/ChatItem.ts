import { template } from "./template.js";
import Block from "../Block/index.js";
import { IChatItemProps } from "./types.js";

export default class ChatItem extends Block<IChatItemProps> {
    constructor(props: IChatItemProps) {
        super("section", props);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 