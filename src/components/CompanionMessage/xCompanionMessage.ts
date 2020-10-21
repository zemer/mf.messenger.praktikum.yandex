import { template } from "./template.js";
import Block from "../Block/index.js";
import { ICompanionMessageProps } from "./types.js";

export default class CompanionMessage extends Block<ICompanionMessageProps> {
    constructor(props: ICompanionMessageProps) {
        super("div", props, "message message-companion column-container body-font");
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
} 