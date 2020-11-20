import { template } from "./template";
import Block from "../Block/index";
import { ICompanionMessageProps } from "./types";

export default class CompanionMessage extends Block<ICompanionMessageProps> {
    constructor(props: ICompanionMessageProps) {
        super("div", props, "message message-companion column-container body-font");
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 