import Block from "../../components/Block/index.js";
import { template } from "./template.js";
import SendMessage from "../../components/SendMessage/index.js";
import { ChatProps } from "./types.js";
import { ISendMessagProps } from "../../components/SendMessage/types.js";
import Button from "../../components/Button/index.js";
import Router from "../../utils/router.js";
import { chatsController } from "../../controllers/ChatsController.js";
import { Store, store } from "../../store/Store.js";
import { AppState, UserState } from "../../store/types.js";
import get from "../../utils/get.js";
import SearchUser from "../../components/SearchUser/index.js";
import ChatUsersList from "../../components/ChatUsersList/index.js";

export default class Chat extends Block<ChatProps> {
    private toList?: Button;
    private toProfile?: Button;
    private sendMessage?: SendMessage;
    private buttonPlusUser?: Button;
    private searchUser?: SearchUser;
    private usersList?: ChatUsersList;

    private searchVisible: boolean = false;

    constructor(props: ChatProps) {
        super("main", props);
    }

    init() {
        this.handlePlusUser = this.handlePlusUser.bind(this);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);

        store.subscribe(Store.EVENTS.CHAT_USERS_CHANGED, this.onChangeStore.bind(this));
        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));

        this.sendMessage = new SendMessage({} as ISendMessagProps);

        this.toList = new Button({
            value: "< Чаты",
            handleClick: () => {
                Router.__instance.go("/chats");
            }
        }, "button");

        this.toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.__instance.go("/profile");
            }
        }, "button");

        this.buttonPlusUser = new Button({
            value: "Добавить",
            handleClick: this.handlePlusUser
        }, "button full-width");

        this.searchUser = new SearchUser({
            onSelectUser: this.handleSelectUser,
            visible: false
        });

        this.usersList = new ChatUsersList({
            users: this.props.users,
            onDeleteUser: this.handleDeleteUser
        });

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getChats();
        chatsController.getUsers(this.props.chatId);
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            title: this.props.title,
            user: this.props.user,
            //messages: this.messages.map(m => m.renderToString()),
            sendMessage: this.sendMessage?.renderToString(),
            toList: this.toList?.renderToString(),
            toProfile: this.toProfile?.renderToString(),
            buttonPlusUser: this.buttonPlusUser?.renderToString(),
            createChat: this.searchUser?.renderToString(),
            usersList: this.usersList?.renderToString(),
        });

        return block;
    }

    onChangeStore() {
        const users = this.usersSelector(store.getState());
        const chat = this.chatSelector(store.getState());

        this.setProps({
            ...this.props,
            users,
            title: chat?.title ?? ""
        });

        if (this.usersList) {
            this.usersList.setProps({
                ...this.usersList.props,
                users
            });
        }
    }

    usersSelector(state: AppState) {
        return get(state, "activeChat.users");
    }

    chatSelector(state: AppState) {
        return state.chats.items.find(c => c.id.toString() === this.props.chatId.toString());
    }

    handlePlusUser() {
        this.searchVisible = !this.searchVisible;
        this.showSearchUser(this.searchVisible);
    }

    handleSelectUser(user: UserState) {
        chatsController.addUser(user.id, this.props.chatId);

        this.showSearchUser(false);
    }

    handleDeleteUser(user: UserState) {
        chatsController.deleteUser(user.id, this.props.chatId);
    }

    showSearchUser(visible: boolean) {
        if (this.searchUser) {
            this.searchUser.setProps({
                ...this.searchUser.props,
                visible
            });
        }

        if (this.usersList) {
            this.usersList.setProps({
                ...this.usersList.props,
                visible: !visible
            });
        }

        this.buttonPlusUser?.setProps({
            ...this.buttonPlusUser.props,
            value: visible ? "Отменить" : "Добавить"
        })
    }
} 