import ChatAPI from "../api/chat-api";
import { Store, store } from "../store/Store";
import { TToken } from "../store/types";

export default class ChatsController {
    private chatAPI: ChatAPI;

    constructor() {
        this.chatAPI = new ChatAPI();
    }

    getChats(): void {
        this.chatAPI.getChats()
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.CHATS_ITEMS_CHANGED, { items: res }));
    }

    getUsers(chatId: number): void {
        this.chatAPI.getUsers(chatId)
            .then((res) => JSON.parse(res.response))
            .then((res) => store.dispatch(Store.EVENTS.CHAT_USERS_CHANGED, { items: res }));
    }

    create(title: string): void {
        this.chatAPI.createChat(title)
            .then(() => this.getChats());
    }

    addUser(userId: number, chatId: number): void {
        this.chatAPI.addUser(userId, chatId)
            .then(() => this.getUsers(chatId));
    }

    deleteUser(userId: number, chatId: number): void {
        this.chatAPI.deleteUser(userId, chatId)
            .then(() => this.getUsers(chatId));
    }

    getToken(chatId: number): Promise<TToken> {
        console.log(chatId);

        return this.chatAPI.getToken(chatId)
            .then((res) => JSON.parse(res.response) as TToken);
    }
}

export const chatsController = new ChatsController();
