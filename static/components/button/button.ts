import { template } from "./template.js";
import Block from "../block/block.js";
import { } from "handlebars";

export default class Button extends Block {
    constructor(props, classes: string | null = null) {
        super("button", props, classes);

        if (this.element) {
            this.element.setAttribute("type", "button");
        }
    }

    render() {
        var compiled = Handlebars.compile(template);

        1 && setTimeout(() => {
            this.setProps({
                value: 'v' + Math.random()
            });

            console.log(this.element?.onclick);

        }, 5000);

        return compiled(this.props);
    }

    setEvents() {
        if (this._element) {
            this._element.onclick = this.props.handleClick;
        }
    }
} 