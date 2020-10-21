import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { items, messages } from "../data.js";
import SendMessage from "../../../components/SendMessage/index.js";
import { IChatProps } from "./types.js";
import { ISendMessagProps } from "../../../components/SendMessage/types.js";

export default class Chat extends Block<IChatProps> {
    constructor() {
        const sendMessage = new SendMessage({} as ISendMessagProps);

        super("main", {
            items,
            user: "Илья",
            messages,
            sendMessage
        }, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString()),
            user: this.props.user,
            messages: this.props.messages.map(m => m.renderToString()),
            sendMessage: this.props.sendMessage.renderToString()
        });

        return block;
    }
} 