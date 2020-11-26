import Block from "Components/Block";
import { TMessage, TProfile } from "Store/types";
import OwnMessage from "Components/OwnMessage";
import IMessageProps from "Components/Message/types";
import CompanionMessage from "Components/CompanionMessage";
import template from "./template";
import { MessagesListProps } from "./types";

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

    doAfterRender() {
        super.doAfterRender();

        if (this.element) {
            this.element.scrollTop = this.element?.scrollHeight;
        }
    }
}
