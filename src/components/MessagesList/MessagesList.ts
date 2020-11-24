import template from "./template";
import Block from "../Block/index";
import { MessagesListProps } from "./types";
import { TMessage } from "../../store/types";
import OwnMessage from "../OwnMessage";
import IMessageProps from "../Message/types";
import CompanionMessage from "../CompanionMessage";

export default class MessagesList extends Block<MessagesListProps> {
    constructor(props: MessagesListProps) {
        super("section", props, "column-container");
    }

    render() {
        const messages = this.props.messages?.map((i: TMessage) => {
            if (i.userId === this.props.userId) {
                return new OwnMessage({ content: i } as IMessageProps);
            }
            return new CompanionMessage({ content: i } as IMessageProps);
        });

        const compiled = Handlebars.compile(template);
        return compiled({
            items: messages?.map((i) => i.renderToString())
        });
    }
}
