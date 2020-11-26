import Block from "Components/Block";
import { formatDateTime } from "Utils/dateHelper";
import template from "./template";
import IMessageProps from "./types";

export default class Message extends Block<IMessageProps> {
    constructor(props: IMessageProps, classes: string) {
        super("div", props, classes);
    }

    render() {
        const compiled = Handlebars.compile(template);
        const time = new Date(this.props.content.time);
        return compiled({
            name: this.props.username,
            content: this.props.content.content,
            time: formatDateTime(time)
        });
    }
}
