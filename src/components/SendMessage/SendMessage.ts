import { template } from "./template.js";
import Block from "../Block/index.js";
import { } from "handlebars";
import Button from "../Button/index.js";
import MessageInput from "../MessageInput/index.js";

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