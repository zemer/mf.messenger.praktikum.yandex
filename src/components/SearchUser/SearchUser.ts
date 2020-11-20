import { template } from "./template";
import Block from "../Block/index";
import { FindUserProps } from "./types";
import Button from "../Button/index";
import Input from "../Input/index";
import { Store, store } from "../../store/Store";
import { AppState, UserState } from "../../store/interfaces";
import getFieldByPath from "../../utils/getFieldByPath";
import { usersController } from "../../controllers/UsersController";
import ChatUser from "../ChatUser/index";
import { sanitize } from "../../utils/escape";

export default class SearchUser extends Block<FindUserProps> {
    private searchField?: Input;
    private buttonSearch?: Button;

    constructor(props: FindUserProps, visible: boolean = true) {
        super("div", props, "full-screen", visible);
    }

    init() {
        this.handleRunSearch = this.handleRunSearch.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);

        store.subscribe(Store.EVENTS.SEARCH_USERS, this.onChangeStore.bind(this));

        this.buttonSearch = new Button({
            value: "OK",
            handleClick: this.handleRunSearch,
        }, "button full-height");

        this.searchField = new Input({
            id: "searchUser",
            value: "",
            placeholder: "Поиск по логину"
        }, "full-width");

        super.init();
    }

    render() {
        const users = this.props.users ?? [];

        const items = users.map((i: UserState) => new ChatUser({
            id: i.id,
            displayName: i.display_name,
            login: i.login,
            avatar: i.avatar,
            deleteVisible: false,
            onClick: () => { this.handleUserClick(i) }
        }));

        const compiled = Handlebars.compile(template);
        return compiled({
            newChatName: this.searchField?.renderToString(),
            buttonCreateChat: this.buttonSearch?.renderToString(),
            items: items?.map(i => i.renderToString()),
        });
    }

    onChangeStore() {
        const users = this.usersSelector(store.getState());

        this.setProps({
            ...this.props,
            users
        });
    }

    usersSelector(state: AppState) {
        return getFieldByPath(state, "search.users");
    }

    handleRunSearch() {
        if (this.searchField?.value)
            usersController.search(sanitize(this.searchField.value));
    }

    handleUserClick(user: UserState) {
        if (this.props.onSelectUser) {
            this.props.onSelectUser(user);
        }
    }
} 