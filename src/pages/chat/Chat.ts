import Block from "Components/Block";
import SendMessage from "Components/SendMessage";
import Button from "Components/Button";
import Router from "Utils/router";
import { chatsController } from "Controllers/ChatsController";
import { Store, store } from "Store/Store";
import { AppState, UserState } from "Store/interfaces";
import getFieldByPath from "Utils/getFieldByPath";
import SearchUser from "Components/SearchUser";
import ChatUsersList from "Components/ChatUsersList";
import { messagesController } from "Controllers/MessagesController";
import { TProfile } from "Store/types";
import { authController } from "Controllers/AuthController";
import MessagesList from "Components/MessagesList";
import { ChatProps } from "./interfaces";
import template from "./template";

export default class Chat extends Block<ChatProps> {
    private toList?: Button;

    private toProfile?: Button;

    private sendMessage?: SendMessage;

    private buttonPlusUser?: Button;

    private searchUser?: SearchUser;

    private usersList?: ChatUsersList;

    private messagesList?: MessagesList;

    constructor(props: ChatProps) {
        super("main", props);
    }

    init() {
        store.subscribe(Store.EVENTS.CHAT_USERS_CHANGED, this.onUsersChanged.bind(this));
        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onPropsChanged.bind(this));
        store.subscribe(Store.EVENTS.NEW_MESSAGE, this.handleNewMessage.bind(this));
        store.subscribe(Store.EVENTS.OLD_MESSAGES, this.handleOldMessages.bind(this));
        store.subscribe(Store.EVENTS.PROFILE_CHANGED, this.onProfileChanged.bind(this));

        this.sendMessage = new SendMessage({
            onSend: (message: string) => {
                messagesController.send(message);
            }
        });

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
            handleClick: () => this.showSearchUser(this.usersList?.visible !== false)
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

        this.messagesList = new MessagesList({
            profile: this.profileSelector(store.getState()),
            users: this.usersSelector(store.getState()),
            messages: this.props.messages
        });

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getChats();

        const usersPromise = chatsController.getUsers(this.props.chatId);
        const profilePromise = authController.getProfile();
        const tokenPromise = chatsController.getToken(this.props.chatId);

        Promise.all([usersPromise, profilePromise, tokenPromise])
            .then(([, profile, token]) => messagesController.startConversation(profile.id, this.props.chatId, token.token));
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            title: this.props.title,
            user: this.props.user,
            sendMessage: this.sendMessage?.renderToString(),
            toList: this.toList?.renderToString(),
            toProfile: this.toProfile?.renderToString(),
            buttonPlusUser: this.buttonPlusUser?.renderToString(),
            createChat: this.searchUser?.renderToString(),
            usersList: this.usersList?.renderToString(),
            messages: this.messagesList?.renderToString()
        });

        return block;
    }

    onUsersChanged() {
        const users = this.usersSelector(store.getState());

        this.setProps({
            ...this.props,
            users
        });

        if (this.usersList) {
            this.usersList.setProps({
                ...this.usersList.props,
                users
            });
        }

        if (this.messagesList) {
            this.messagesList.setProps({
                ...this.messagesList.props,
                users
            });
        }
    }

    onPropsChanged() {
        const chat = this.chatSelector(store.getState());

        this.setProps({
            ...this.props,
            title: chat?.title || ""
        });
    }

    onProfileChanged() {
        const profile = this.profileSelector(store.getState());

        this.setProps({
            ...this.props,
            profile
        });

        this.messagesList?.setProps({
            ...this.messagesList.props,
            profile
        });
    }

    handleNewMessage() {
        const messages = this.messagesSelector(store.getState());

        this.setProps({
            ...this.props,
            messages
        });

        if (this.messagesList) {
            this.messagesList.setProps({
                ...this.messagesList.props,
                messages
            });
        }
    }

    handleOldMessages() {
        const messages = this.messagesSelector(store.getState());

        this.setProps({
            ...this.props,
            messages
        });

        if (this.messagesList) {
            this.messagesList.setProps({
                ...this.messagesList.props,
                messages
            });
        }
    }

    profileSelector(state: AppState): TProfile {
        return getFieldByPath(state, "profile");
    }

    usersSelector(state: AppState): TProfile[] {
        return getFieldByPath(state, "activeChat.users");
    }

    chatSelector(state: AppState) {
        return state.chats.items.find((c) => c.id.toString() === this.props.chatId.toString());
    }

    messagesSelector(state: AppState) {
        return getFieldByPath(state, "activeChat.messages");
    }

    showSearchUser(visible: boolean) {
        this.buttonPlusUser?.setProps({
            ...this.buttonPlusUser.props,
            value: visible ? "Отменить" : "Добавить"
        });

        if (visible) {
            this.usersList?.hide();
            this.searchUser?.show();
        } else {
            this.usersList?.show();
            this.searchUser?.hide();
        }
    }
}
