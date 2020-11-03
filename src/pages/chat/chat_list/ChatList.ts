import Block from "../../../components/Block/index.js";
import { template } from "./template.js";
import { IChatListProps } from "./types.js";
import Link from "../../../components/Link/index.js";
import { chatsController } from "../../../controllers/ChatsController.js";
import { IChatItemState, IChatState, Store, store } from "../../../store/Store.js";
import ChatItem from "../../../components/ChatItem/index.js";

export default class ChatList extends Block<IChatListProps> {
    //chatsSelector: (state: any) => ChatItem[];

    constructor() {
        const toProfile = new Link({
            text: "Профиль >",
            path: "/profile"
        });

        super("main", {
            items: [],
            toProfile
        }, "full-height zero-margin");

        // function makeSelector(getState: (globalStore: IChatState) => object): () => ChatItem[] {
        //     return () => {
        //         return (getState() as IChatItemState[]).map((i: IChatItemState) => new ChatItem({ i }));
        //     }
        // };

        // this.chatsSelector = makeSelector((globalStore: IChatState) => get(globalStore, "chats.items"));
        // Применяем навыки получения данных по пути
        //b => b || [], // На этом этапе можно делать свой мемоизатор, чтобы выдавать данные из кеша
        //);

        store.subscribe(Store.EVENTS.CHATS_ITEMS_CHANGED, this.onChangeStore.bind(this));
    }

    componentDidMount() {
        super.componentDidMount();

        chatsController.getChats();
    }

    get(obj: any, path: string): any {
        const keys = path.split('.');

        let result = obj;
        for (let key of keys) {
            const value = result[key];

            if (!value) {
                return undefined;
            }

            result = value;
        }

        return result;
    }

    chatsSelector(state: IChatState) {
        const items = this.get(state, "chats.items");
        return (items as IChatItemState[]).map((i: IChatItemState) => new ChatItem({
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