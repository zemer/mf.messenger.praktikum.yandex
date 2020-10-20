import { template } from "./template.js";
import Block from "../block/block.js";
export default class Input extends Block {
    constructor(props) {
        if (props && !props.hasOwnProperty("type"))
            props.type = "text";
        super("div", props);
        console.log(props);
    }
    componentDidMount(oldProps) {
        var _a;
        super.componentDidMount(oldProps);
        console.log(1, this.element);
        (_a = this.element) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.props.click);
    }
    onFocus(ev) {
        console.log('onFocus', ev);
    }
    render() {
        var _a;
        const compiled = Handlebars.compile(template);
        const result = compiled(this.props);
        const element = this.element;
        if (element) {
            element.innerHTML = result;
        }
        return (_a = element === null || element === void 0 ? void 0 : element.outerHTML) !== null && _a !== void 0 ? _a : "";
    }
}
//# sourceMappingURL=input.js.map