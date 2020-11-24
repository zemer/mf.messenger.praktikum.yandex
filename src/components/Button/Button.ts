import template from "./template";
import Block from "../Block/index";
import { IButtonProps } from "./types";

export default class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps, classes: string | null = null) {
        super("button", props, classes);

        if (this.element) {
            this.element.setAttribute("type", "button");
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    setEvents() {
        if (this.blockElement) {
            this.blockElement.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick() {
        this.props.handleClick();
    }
}
