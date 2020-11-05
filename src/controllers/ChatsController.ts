import ChatAPI from "../api/chat-api.js";
import { Store, store } from "../store/Store.js";

export default class ChatsController {
    private _chatAPI: ChatAPI;

    constructor() {
        this._chatAPI = new ChatAPI();
    }

    getChats() {
        this._chatAPI.getChats()
            .then(res => this.checkStatus(res))
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.CHATS_ITEMS_CHANGED, { items: res }));
    }

    getUsers(chatId: string) {
        this._chatAPI.getUsers(chatId)
            .then(res => this.checkStatus(res))
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.CHAT_USERS_CHANGED, { items: res }));
    }

    create(title: string) {
        this._chatAPI.createChat(title)
            .then(res => this.checkStatus(res))
            .then(() => this.getChats())
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;

        return res;
    }
}

export const chatsController = new ChatsController();