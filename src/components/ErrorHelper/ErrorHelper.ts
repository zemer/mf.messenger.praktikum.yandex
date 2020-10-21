import { template } from "./template.js";
import Block from "../Block/index.js";
import { } from "handlebars";
import { IErrorHelperProps } from "./types.js";

export default class ErrorHelper extends Block<IErrorHelperProps> {
    constructor(props: IErrorHelperProps) {
        super("div", props, "error-font error-helper");

        this.hide();
    }

    render() {
        const compiled = Handlebars.compile(template);
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