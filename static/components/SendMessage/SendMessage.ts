import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";
import ErrorHelper from "../ErrorHelper/ErrorHelper.js";
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

        super("div", {
            ...props,
            message,
            button
        }, "edit-message full-width row-container");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            ...this.props,
            message: this.props.message.renderToString(),
            button: this.props.button.renderToString(),
        });

        return block;
    }
} 