import { template } from "./template.js";
import Block from "../block.js";
export default class OwnMessage extends Block {
    constructor(props) {
        super("div", props);
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
//# sourceMappingURL=ownMessage.js.map