import Block from "Components/Block";
import { chatsController } from "Controllers/ChatsController";
import { Store, store } from "Store/Store";
import ChatItem from "Components/ChatItem";
import getFieldByPath from "Utils/getFieldByPath";
import Button from "Components/Button";
import Router from "Utils/router";
import CreateChat from "Components/CreateChat";
import { AppState, ChatItemState } from "Store/interfaces";
import { ChatListProps } from "./interfaces";
import template from "./template";

export default class ChatList extends Block<ChatListProps> {
    private toProfile?: Button;

    private buttonPlusChat?: Button;

    private createChat?: CreateChat;

    constructor() {
        super("main", {
            items: []
        });
    }

    init() {
        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));

        this.toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.go("/profile");
            }
        }, "button");

        this.buttonPlusChat = new Button({
            value: "Добавить",
            handleClick: () => {
                this.showCreateChat(this.createChat?.visible !== true);
            }
        }, "button full-width");

        this.createChat = new CreateChat({
            onCreateChat: (name: string) => {
                chatsController.create(name);

                this.showCreateChat(false);
            }
        }, false);

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getChats();
    }

    chatsSelector(state: AppState) {
        return getFieldByPath(state, "chats.items");
    }

    onChangeStore() {
        const items = this.chatsSelector(store.getState());

        this.setProps({
            ...this.props,
            items
        });
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map((i: ChatItemState) => new ChatItem({
                id: i.id,
                title: i.title,
                avatar: i.avatar,
                onClick: () => {
                    Router.go(`/chats/${i.id}`);
                }
            })).map((i) => i.renderToString()),
            toProfile: this.toProfile?.renderToString(),
            buttonPlusChat: this.buttonPlusChat?.renderToString(),
            createChat: this.createChat?.renderToString()
        });

        return block;
    }

    showCreateChat(visible: boolean) {
        if (visible) {
            this.createChat?.show();
        } else {
            this.createChat?.hide();
        }
    }
}
