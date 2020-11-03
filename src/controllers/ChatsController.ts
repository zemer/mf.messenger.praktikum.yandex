import ChatAPI from "../api/chat-api.js";
import { Store, store } from "../store/Store.js";

export default class ChatsController {
    private _chatAPI: ChatAPI;

    constructor() {
        this._chatAPI = new ChatAPI();
    }

    getChats() {
        this._chatAPI.request()
            .then(res => this.checkStatus(res))
            .then(res => JSON.parse(res.response))
            .then(res => store.dispatch(Store.EVENTS.CHATS_ITEMS_CHANGED, { items: res }));
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;

        return res;
    }
}

export const chatsController = new ChatsController();