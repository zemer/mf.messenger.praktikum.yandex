import Block from "../../components/Block/index";
import { template } from "./template";
import SendMessage from "../../components/SendMessage/index";
import { ChatProps } from "./interfaces";
import { ISendMessagProps } from "../../components/SendMessage/types";
import Button from "../../components/Button/index";
import Router from "../../utils/router";
import { chatsController } from "../../controllers/ChatsController";
import { Store, store } from "../../store/Store";
import { AppState, UserState } from "../../store/interfaces";
import getFieldByPath from "../../utils/getFieldByPath";
import SearchUser from "../../components/SearchUser/index";
import ChatUsersList from "../../components/ChatUsersList/index";

export default class Chat extends Block<ChatProps> {
    private toList?: Button;
    private toProfile?: Button;
    private sendMessage?: SendMessage;
    private buttonPlusUser?: Button;
    private searchUser?: SearchUser;
    private usersList?: ChatUsersList;

    constructor(props: ChatProps) {
        super("main", props);
    }

    init() {
        store.subscribe(Store.EVENTS.CHAT_USERS_CHANGED, this.onChangeStore.bind(this));
        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));

        this.sendMessage = new SendMessage({} as ISendMessagProps);

        this.toList = new Button({
            value: "< Чаты",
            handleClick: () => {
                Router.go("/chats");
            }
        }, "button");

        this.toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.go("/profile");
            }
        }, "button");

        this.buttonPlusUser = new Button({
            value: "Добавить",
            handleClick: () => {
                this.showSearchUser(this.usersList?.visible !== false);
            }
        }, "button full-width");

        this.searchUser = new SearchUser({
            onSelectUser: (user: UserState) => {
                chatsController.addUser(user.id, this.props.chatId);

                this.showSearchUser(false);
            }
        }, false);

        this.usersList = new ChatUsersList({
            users: this.props.users,
            onDeleteUser: (user: UserState) => {
                chatsController.deleteUser(user.id, this.props.chatId);
            }
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
        return getFieldByPath(state, "activeChat.users");
    }

    chatSelector(state: AppState) {
        return state.chats.items.find(c => c.id.toString() === this.props.chatId.toString());
    }

    showSearchUser(visible: boolean) {
        this.buttonPlusUser?.setProps({
            ...this.buttonPlusUser.props,
            value: visible ? "Отменить" : "Добавить"
        })

        if (visible) {
            this.usersList?.hide();
            this.searchUser?.show();
        }
        else {
            this.usersList?.show();
            this.searchUser?.hide();
        }
    }
} 