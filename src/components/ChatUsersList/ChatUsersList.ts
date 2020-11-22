import { template } from "./template";
import Block from "../Block/index";
import { ChatUsersListProps } from "./types";
import { UserState } from "../../store/interfaces";
import ChatUser from "../ChatUser/index";

export default class ChatUsersList extends Block<ChatUsersListProps> {
    constructor(props: ChatUsersListProps) {
        super("section", props);
    }

    init() {
        this.handleClick = this.handleClick.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);

        super.init();
    }

    render() {
        const users = this.props.users?.map((i: UserState) => new ChatUser({
            id: i.id,
            displayName: i.display_name,
            login: i.login,
            avatar: i.avatar,
            deleteVisible: true,
            onDelete: () => { this.handleDeleteUser(i); }
        }));

        const compiled = Handlebars.compile(template);
        return compiled({
            items: users?.map((i) => i.renderToString())
        });
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick() {
        // this.props.onClick();
    }

    handleDeleteUser(user: UserState) {
        if (this.props.onDeleteUser) this.props.onDeleteUser(user);
    }
}
