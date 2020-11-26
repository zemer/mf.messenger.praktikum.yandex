import Block from "Components/Block";
import Button from "Components/Button";
import Input from "Components/Input";
import { Store, store } from "Store/Store";
import { AppState, UserState } from "Store/interfaces";
import getFieldByPath from "Utils/getFieldByPath";
import { usersController } from "Controllers/UsersController";
import ChatUser from "Components/ChatUser";
import sanitize from "Utils/escape";
import template from "./template";
import { FindUserProps } from "./types";

export default class SearchUser extends Block<FindUserProps> {
    private searchField?: Input;

    private buttonSearch?: Button;

    constructor(props: FindUserProps, visible = true) {
        super("div", props, "full-screen", visible);
    }

    init() {
        this.handleRunSearch = this.handleRunSearch.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);

        store.subscribe(Store.EVENTS.SEARCH_USERS, this.onChangeStore.bind(this));

        this.buttonSearch = new Button({
            value: "OK",
            handleClick: this.handleRunSearch
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
            onClick: () => { this.handleUserClick(i); }
        }));

        const compiled = Handlebars.compile(template);
        return compiled({
            newChatName: this.searchField?.renderToString(),
            buttonCreateChat: this.buttonSearch?.renderToString(),
            items: items?.map((i) => i.renderToString())
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
        if (this.searchField?.value) usersController.search(sanitize(this.searchField.value));
    }

    handleUserClick(user: UserState) {
        if (this.props.onSelectUser) {
            this.props.onSelectUser(user);
        }
    }
}
