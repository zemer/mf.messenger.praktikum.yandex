import { template } from "./template.js";
import Block from "../Block/index.js";
import { IChatItemProps } from "./types.js";
import Avatar from "../Avatar/index.js";

export default class ChatItem extends Block<IChatItemProps> {
    private avatar?: Avatar;

    constructor(props: IChatItemProps) {
        super("section", props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled({
            ...this.props,
            avatar: this.avatar?.renderToString()
        });
    }

    init() {
        this.avatar = new Avatar({
            imgId: this.props.id + "-avatar",
            source: this.props.avatar ?? ""
        });

        super.init();
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick() {
        this.props.onClick();
    }
} 