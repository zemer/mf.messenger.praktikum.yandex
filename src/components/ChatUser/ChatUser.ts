import { template } from "./template.js";
import Block from "../Block/index.js";
import { ChatUserProps } from "./types.js";
import Avatar from "../Avatar/index.js";
import { baseAPIUrl } from "../../api/http.js";

export default class ChatUser extends Block<ChatUserProps> {
    private avatar?: Avatar;

    constructor(props: ChatUserProps) {
        super("section", props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const compiled = Handlebars.compile(template);
        return compiled({
            avatar: this.avatar?.renderToString(),
            title: this.props.login
        });
    }

    init() {
        let avatarSource = "";

        if (this.props.avatar) {
            avatarSource = baseAPIUrl + this.props.avatar;
        }

        this.avatar = new Avatar({
            imgId: this.props.id + "-avatar",
            source: avatarSource
        });

        super.init();
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener('click', this.handleClick, true);
        }
    }

    handleClick() {
        //this.props.onClick();
    }
} 