import BaseAPI from "./base-api.js";
import { chatAPIInstance } from "./http.js";

export default class ChatAPI extends BaseAPI {
    // create() {
    //     // Здесь уже не нужно писать полный путь /api/v1/chats/
    //     return chatAPIInstance.post('/', { title: 'string' });
    // }

    request() {
        return chatAPIInstance.get("/", {});
    }

    createChat(title: string) {
        return chatAPIInstance.post("/", {
            data: {
                title
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
    }
} 