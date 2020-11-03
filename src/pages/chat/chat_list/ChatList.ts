import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { IChatListProps } from "./types.js";
import { chatsController } from "../../../controllers/ChatsController.js";
import { ChatItemState, AppState, Store, store } from "../../../store/Store.js";
import ChatItem from "../../../components/ChatItem/index.js";
import get from "../../../utils/get.js";
import Button from "../../../components/Button/index.js";
import Router from "../../../utils/router.js";

export default class ChatList extends Block<IChatListProps> {
    constructor() {

        const toProfile = new Button({
            value: "Профиль >",
            handleClick: () => {
                Router.__instance.go("/profile");
            }
        }, "button");

        super("main", {
            items: [],
            toProfile
        }, "full-height zero-margin");

        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getChats();
    }

    chatsSelector(state: AppState) {
        const items = get(state, "chats.items");
        return (items as ChatItemState[]).map((i: ChatItemState) => new ChatItem({
            id: i.id,
            title: i.title,
            avatar: i.avatar
        }));
    }

    onChangeStore() {
        this.setProps({
            ...this.props,
            items: this.chatsSelector(store.getState())
        })
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            items: this.props.items.map(i => i.renderToString()),
            toProfile: this.props.toProfile.renderToString()
        });

        return block;
    }
} 