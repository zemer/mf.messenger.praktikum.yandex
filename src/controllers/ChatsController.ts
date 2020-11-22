import ChatAPI from "../api/chat-api";
import { Store, store } from "../store/Store";

export default class ChatsController {
    private _chatAPI: ChatAPI;

    constructor() {
        this._chatAPI = new ChatAPI();
    }

    getChats() {
        this._chatAPI.getChats()
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.CHATS_ITEMS_CHANGED, { items: res }));
    }

    getUsers(chatId: number) {
        this._chatAPI.getUsers(chatId)
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.CHAT_USERS_CHANGED, { items: res }));
    }

    create(title: string) {
        this._chatAPI.createChat(title)
            .then(() => this.getChats());
    }

    addUser(userId: number, chatId: number) {
        this._chatAPI.addUser(userId, chatId)
            .then(() => this.getUsers(chatId));
    }

    deleteUser(userId: number, chatId: number) {
        this._chatAPI.deleteUser(userId, chatId)
            .then(() => this.getUsers(chatId));
    }
}

export const chatsController = new ChatsController();
