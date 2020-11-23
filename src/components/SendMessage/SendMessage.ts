import template from "./template";
import Block from "../Block/index";
import Button from "../Button/index";
import MessageInput from "../MessageInput/index";
import { ISendMessagProps } from "./types";

export default class SendMessage extends Block<ISendMessagProps> {
    constructor(props: ISendMessagProps) {
        const message = new MessageInput({});

        const button = new Button({
            value: "GO",
            handleClick: () => {
                message.validate();
            }
        }, "button send-button full-height");

        super("div", {
            ...props,
            message,
            button
        }, "edit-message full-width row-container");
    }

    render(): string {
        const compile = Handlebars.compile(template);
        const block = compile({
            ...this.props,
            message: this.props.message.renderToString(),
            button: this.props.button.renderToString()
        });

        return block;
    }
}
