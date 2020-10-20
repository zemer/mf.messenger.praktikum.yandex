import Block from "../../../components/block/block.js";
import { template } from "./template.js";
import { items, messages } from "../data.js";
import SendMessage from "../../../components/SendMessage/SendMessage.js";
export default class Chat extends Block {
    constructor() {
        const sendMessage = new SendMessage({});
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
//# sourceMappingURL=Chat.js.map