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
import ChatUser from "../../components/ChatUser/index.js";

export default class Chat extends Block<ChatProps> {
    private toProfile?: Button;
    private sendMessage?: SendMessage;

    constructor(props: ChatProps) {
        super("main", props, "full-height zero-margin");
    }

    init() {
        store.subscribe(Store.EVENTS.CHAT_USERS_CHANGED, this.onChangeStore.bind(this));

        this.sendMessage = new SendMessage({} as ISendMessagProps);

        this.toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.__instance.go("/profile");
            }
        }, "button");

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getUsers(this.props.chatId);
    }

    render() {
        const compile = Handlebars.compile(template);

        const users = this.props.users?.map((i: UserState) => new ChatUser({
            id: i.id,
            displayName: i.display_name,
            avatar: i.avatar,
        }));

        const block = compile({
            items: users?.map(i => i.renderToString()),
            user: this.props.user,
            //messages: this.messages.map(m => m.renderToString()),
            sendMessage: this.sendMessage?.renderToString(),
            toProfile: this.toProfile?.renderToString()
        });

        return block;
    }

    onChangeStore() {
        const users = this.usersSelector(store.getState());

        this.setProps({
            ...this.props,
            users
        });
    }

    usersSelector(state: AppState) {
        return get(state, "activeChat.users");
    }
} 