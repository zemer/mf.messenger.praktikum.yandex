import ChatAPI from "../api/chat-api.js";
import { Store, store } from "../store/Store.js";

export default class ChatsController {
    private _chatAPI: ChatAPI;

    constructor() {
        this._chatAPI = new ChatAPI();
    }

    getChats() {
        this._chatAPI.request()
            .then(res => {
                this.checkStatus(res);
                return res.response;
            })
            .then(res => JSON.parse(res))
            .then(res => {

                console.log(res);

                store.dispatch(Store.EVENTS.CHATS_ITEMS_CHANGED, { items: res })
            })
    }

    private checkStatus(res: XMLHttpRequest) {
        if (res.status != 200)
            throw res.status + " " + res.statusText;
    }
}

export const chatsController = new ChatsController();