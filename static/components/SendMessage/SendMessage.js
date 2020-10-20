import { template } from "./template.js";
import Block from "../block/block.js";
import Button from "../Button/Button.js";
import MessageInput from "../MessageInput/MessageInput.js";
export default class SendMessage extends Block {
    constructor(props) {
        const message = new MessageInput({});
        const button = new Button({
            value: "GO",
            handleClick: () => {
                message.validate();
            }
        }, "button send-button");
        super("div", Object.assign(Object.assign({}, props), { message,
            button }), "edit-message full-width row-container");
    }
    render() {
        const compile = Handlebars.compile(template);
        const block = compile(Object.assign(Object.assign({}, this.props), { message: this.props.message.renderToString(), button: this.props.button.renderToString() }));
        return block;
    }
}
//# sourceMappingURL=SendMessage.js.map