import { chatAPIInstance } from "./http.js";

export default class ChatAPI {
    getChats() {
        return chatAPIInstance.get("/");
    }

    getUsers(chatId: number) {
        return chatAPIInstance.get(`/${chatId}/users`);
    }

    createChat(title: string) {
        return chatAPIInstance.post("/", {
            data: {
                title
            }
        });
    }

    addUser(userId: number, chatId: number) {
        return chatAPIInstance.put("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }

    deleteUser(userId: number, chatId: number) {
        return chatAPIInstance.delete("/users", {
            data: {
                users: [userId],
                chatId
            }
        });
    }
} 