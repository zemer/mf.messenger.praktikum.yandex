import { HTTPTransport } from "Utils/fetch";
import { httpAPIUrl } from "Api/api-url";

export default class ChatAPI {
    private chatAPIInstance = new HTTPTransport(`${httpAPIUrl}/api/v2/chats`);

    getChats(): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.get("/");
    }

    getUsers(chatId: number): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.get(`/${chatId}/users`);
    }

    createChat(title: string): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.post("/", {
            data: { title }
        });
    }

    addUser(userId: number, chatId: number): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.put("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }

    deleteUser(userId: number, chatId: number): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.delete("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }

    getToken(chatId: number): Promise<XMLHttpRequest> {
        return this.chatAPIInstance.post(`/token/${chatId}`);
    }
}
