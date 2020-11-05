import { template } from "./template.js";
import Block from "../Block/index.js";
import { ChatUserProps } from "./types.js";
import Avatar from "../Avatar/index.js";
import { baseAPIUrl } from "../../api/http.js";
import Button from "../Button/index.js";

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
            avatarSource = baseAPIUrl + this.props.avatar;
        }

        this.avatar = new Avatar({
            imgId: this.props.id + "-avatar",
            source: avatarSource
        });

        this.deleteButton = new Button({
            value: "X",
            handleClick: this.handleDelete,
            visible: this.props.deleteVisible
        });

        super.init();
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener('click', this.handleClick, true);
        }
    }

    handleClick() {
        if (this.props.onClick)
            this.props.onClick();
    }

    handleDelete() {
        if (this.props.onDelete)
            this.props.onDelete();
    }
} 