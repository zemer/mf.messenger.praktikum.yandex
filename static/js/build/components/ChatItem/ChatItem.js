import { template } from "./template.js";
import Block from "../Block/index.js";
export default class ChatItem extends Block {
    constructor(props) {
        super("section", props);
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
}
//# sourceMappingURL=ChatItem.js.map