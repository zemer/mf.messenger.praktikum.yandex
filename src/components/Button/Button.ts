import { template } from "./template.js";
import Block from "../Block/Block.js";
import { logForm } from "../../utils/logForm.js";
import { } from "handlebars";

export default class Button extends Block {
    constructor(props, classes: string | null = null) {
        super("button", props, classes);

        if (this.element) {
            this.element.setAttribute("type", "button");
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        var compiled = Handlebars.compile(template);
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