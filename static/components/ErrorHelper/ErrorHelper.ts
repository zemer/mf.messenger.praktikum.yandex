import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class ErrorHelper extends Block {
    constructor(props) {
        super("div", props, "error-font error-helper");
    }

    render() {
        var compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    showOnError(message: string | null) {
        if (message) {
            this.setProps({
                ...this.props,
                errorText: message
            });

            this.show();
        }
        else {
            this.hide();
        }
    }
} 