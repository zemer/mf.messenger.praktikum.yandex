import { template } from "./template.js";
import Block from "../Block/index.js";
import { FindUserProps } from "./types.js";
import Button from "../Button/index.js";
import Input from "../Input/index.js";
import { Store, store } from "../../store/Store.js";
import { AppState, UserState } from "../../store/types.js";
import get from "../../utils/get.js";
import { usersController } from "../../controllers/UsersController.js";
import ChatUser from "../ChatUser/index.js";

export default class SearchUser extends Block<FindUserProps> {
    private searchField?: Input;
    private buttonSearch?: Button;

    constructor(props: FindUserProps) {
        super("div", props);
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
        return get(state, "search.users");
    }

    handleRunSearch() {
        if (this.searchField?.value)
            usersController.search(this.searchField.value);
        // const name = this.searchField?.value;
        // if (name) {
        //     this.props.onSelectUser(name);
        // }
    }

    handleUserClick(user: UserState) {
        if (this.props.onSelectUser) {
            this.props.onSelectUser(user);
        }
    }
} 