import { HTTPTransport } from "../utils/fetch";
import { baseAPIUrl } from "./api-url";

export default class ChatAPI {
    private chatAPIInstance = new HTTPTransport(baseAPIUrl + "/api/v2/chats");

    getChats() {
        return this.chatAPIInstance.get("/");
    }

    getUsers(chatId: number) {
        return this.chatAPIInstance.get(`/${chatId}/users`);
    }

    createChat(title: string) {
        return this.chatAPIInstance.post("/", {
            data: {
                title
            }
        });
    }

    addUser(userId: number, chatId: number) {
        return this.chatAPIInstance.put("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }

    deleteUser(userId: number, chatId: number) {
        return this.chatAPIInstance.delete("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }
} 