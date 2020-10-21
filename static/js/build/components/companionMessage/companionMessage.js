import { template } from "./template.js";
import Block from "../Block/index.js";
export default class CompanionMessage extends Block {
    constructor(props) {
        super("div", props, "message message-companion column-container body-font");
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
//# sourceMappingURL=companionMessage.js.map