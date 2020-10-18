import { template } from "./template.js";
import Block from "../block.js";
export default class CompanionMessage extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
//# sourceMappingURL=companionMessage.js.map