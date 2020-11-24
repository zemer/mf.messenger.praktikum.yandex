import template from "./template";
import Block from "../Block/index";
import Button from "../Button/index";
import MessageInput from "../MessageInput/index";
import { ISendMessageProps } from "./types";

export default class SendMessage extends Block<ISendMessageProps> {
    message?: MessageInput;

    button?: Button;

    constructor(props: ISendMessageProps) {
        super("div", props, "edit-message full-width row-container");
    }

    init() {
        this.message = new MessageInput({});

        this.button = new Button({
            value: "GO",
            handleClick: () => {
                if (this.message?.validate() === null) {
                    this.props.onSend(this.message?.value ?? "");
                }
            }
        }, "button send-button full-height");

        super.init();
    }

    render(): string {
        const compile = Handlebars.compile(template);
        const block = compile({
            ...this.props,
            message: this.message?.renderToString(),
            button: this.button?.renderToString()
        });

        return block;
    }
}
