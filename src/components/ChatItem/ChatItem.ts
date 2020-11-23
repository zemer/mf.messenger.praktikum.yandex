import template from "./template";
import Block from "../Block/index";
import { IChatItemProps } from "./types";
import Avatar from "../Avatar/index";

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
            imgId: `${this.props.id}-avatar`,
            source: this.props.avatar ?? ""
        });

        super.init();
    }

    setEvents() {
        if (this.blockElement) {
            this.blockElement.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick() {
        this.props.onClick();
    }
}
