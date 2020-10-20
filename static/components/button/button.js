import { template } from "./template.js";
import Block from "../block/block.js";
export default class Button extends Block {
    constructor(props, classes = null) {
        super("button", props, classes);
        if (this.element) {
            this.element.setAttribute("type", "button");
        }
    }
    render() {
        var compiled = Handlebars.compile(template);
        1 && setTimeout(() => {
            var _a;
            this.setProps({
                value: 'v' + Math.random()
            });
            console.log((_a = this.element) === null || _a === void 0 ? void 0 : _a.onclick);
        }, 5000);
        return compiled(this.props);
    }
    setEvents() {
        if (this._element) {
            this._element.onclick = this.props.handleClick;
        }
    }
}
//# sourceMappingURL=button.js.map