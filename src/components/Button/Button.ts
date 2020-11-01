import { template } from "./template";
import Block from "../Block/index";
import { logForm } from "../../utils/logForm";
import { IButtonProps } from "./types";
import Handlebars from 'handlebars';

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
        if (this._element) {
            this._element.addEventListener('click', this.handleClick);
        }
    }

    handleClick() {
        logForm();
        this.props.handleClick();
    }
} 