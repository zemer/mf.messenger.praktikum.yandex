import { template } from "./template.js";
import Block from "../Block/index.js";
import { IChatItemProps } from "./types.js";

export default class ChatItem extends Block<IChatItemProps> {
    constructor(props: IChatItemProps) {
        super("section", props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled(this.props);
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener('click', this.handleClick, true);
        }
    }

    handleClick() {
        this.props.onClick();
    }
} 