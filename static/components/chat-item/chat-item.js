import { template } from "./template.js";
import Block from "../block.js";
export default class ChatItem extends Block {
    constructor(props) {
        super("section", props);
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
//# sourceMappingURL=chat-item.js.map