import Block from "../../../components/block/block.js";
import { template } from "./template.js";
import { items } from "../data.js";
export default class Chat extends Block {
    constructor() {
        super("main", {
            items
        }, "full-height zero-margin");
    }
    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString())
        });
        return block;
    }
}
//# sourceMappingURL=Chat.js.map