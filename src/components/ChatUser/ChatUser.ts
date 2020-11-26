import Button from "Components/Button";
import Avatar from "Components/Avatar";
import Block from "Components/Block";
import { httpAPIUrl } from "Api/api-Url";
import template from "./template";
import { ChatUserProps } from "./types";

export default class ChatUser extends Block<ChatUserProps> {
    private avatar?: Avatar;

    private deleteButton?: Button;

    constructor(props: ChatUserProps) {
        super("section", props);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled({
            avatar: this.avatar?.renderToString(),
            title: this.props.login,
            deleteButton: this.deleteButton?.renderToString()
        });
    }

    init() {
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        let avatarSource = "";

        if (this.props.avatar) {
            avatarSource = httpAPIUrl + this.props.avatar;
        }

        this.avatar = new Avatar({
            imgId: `${this.props.id}-avatar`,
            source: avatarSource
        });

        this.deleteButton = new Button({
            value: "X",
            handleClick: this.handleDelete,
            visible: this.props.deleteVisible
        });

        super.init();
    }

    doAfterRender() {
        if (this.blockElement) {
            this.blockElement.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick() {
        if (this.props.onClick) this.props.onClick();
    }

    handleDelete() {
        if (this.props.onDelete) this.props.onDelete();
    }
}
