import template from "./template";
import Block from "../Block/index";
import { MessagesListProps } from "./types";
import { TMessage, TProfile } from "../../store/types";
import OwnMessage from "../OwnMessage";
import IMessageProps from "../Message/types";
import CompanionMessage from "../CompanionMessage";

export default class MessagesList extends Block<MessagesListProps> {
    constructor(props: MessagesListProps) {
        super("section", props, "column-container overflow-auto");
    }

    render() {
        const messages = this.props.messages?.map((i: TMessage) => {
            if (i.userId === this.props.profile.id) {
                return new OwnMessage({
                    username: this.props.profile.login,
                    content: i
                } as IMessageProps);
            }
            return new CompanionMessage({
                username: this.props.users.find((u: TProfile) => u.id === i.userId)?.login ?? "?",
                content: i
            } as IMessageProps);
        });

        const compiled = Handlebars.compile(template);
        return compiled({
            items: messages?.map((i) => i.renderToString())
        });
    }
}
