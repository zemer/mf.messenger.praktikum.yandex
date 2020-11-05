import { template } from "./template.js";
import Block from "../Block/index.js";
import { ChatUsersListProps } from "./types.js";
import { UserState } from "../../store/types.js";
import ChatUser from "../ChatUser/index.js";

export default class ChatUsersList extends Block<ChatUsersListProps> {
    constructor(props: ChatUsersListProps) {
        super("section", props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const users = this.props.users?.map((i: UserState) => new ChatUser({
            id: i.id,
            displayName: i.display_name,
            login: i.login,
            avatar: i.avatar,
        }));

        const compiled = Handlebars.compile(template);
        return compiled({
            items: users?.map(i => i.renderToString()),
        });
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