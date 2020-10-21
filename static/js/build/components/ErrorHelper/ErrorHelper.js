import { template } from "./template.js";
import Block from "../Block/index.js";
export default class ErrorHelper extends Block {
    constructor(props) {
        super("div", props, "error-font error-helper");
        this.hide();
    }
    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }
    showOnError(message) {
        if (message) {
            this.setProps(Object.assign(Object.assign({}, this.props), { errorText: message }));
            this.show();
        }
        else {
            this.hide();
        }
    }
}
//# sourceMappingURL=ErrorHelper.js.map