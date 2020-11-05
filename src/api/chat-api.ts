import BaseAPI from "./base-api.js";
import { chatAPIInstance } from "./http.js";

export default class ChatAPI extends BaseAPI {
    getChats() {
        return chatAPIInstance.get("/", {});
    }

    getUsers(chatId: number) {
        return chatAPIInstance.get(`/${chatId}/users`, {});
    }

    createChat(title: string) {
        return chatAPIInstance.post("/", {
            data: {
                title
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    addUser(userId: number, chatId: number) {
        return chatAPIInstance.put("/users", {
            data: {
                users: [userId],
                chatId
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }

    deleteUser(userId: number, chatId: number) {
        return chatAPIInstance.delete("/users", {
            data: {
                users: [userId],
                chatId
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });
    }
} 