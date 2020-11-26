import Block from "Components/Block";
import template from "./template";
import { IErrorHelperProps } from "./types";

export default class ErrorHelper extends Block<IErrorHelperProps> {
    constructor(props: IErrorHelperProps) {
        super("div", props, "error-font error-helper");

        this.hide();
    }

    render(): string {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    showOnError(message: string | null): void {
        if (message) {
            this.setProps({
                ...this.props,
                errorText: message
            });

            this.show();
        } else {
            this.hide();
        }
    }
}
