import { socketAPIUrl } from "../api/api-url";
import { Store, store } from "../store/Store";
import { TMessage } from "../store/types";

export class MessagesController {
    private socket: WebSocket | null = null;

    keepTimer: NodeJS.Timeout | undefined;

    constructor() {
        this.send = this.send.bind(this);
        this.startConversation = this.startConversation.bind(this);
    }

    startConversation(userId: number, chatId: number, token: string) {
        this.socket = new WebSocket(`${socketAPIUrl}/${userId}/${chatId}/${token}`);

        this.socket.addEventListener("open", () => {
            console.log("Соединение установлено");

            // this.keepTimer = setInterval(() => {
            //     this.socket?.send("");
            // }, 7000);
        });

        this.socket.addEventListener("close", (event) => {
            if (event.wasClean) {
                this.keepTimer = undefined;
                console.log("Соединение закрыто чисто");
            } else {
                console.log("Обрыв соединения");
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`, event);
        });

        this.socket.addEventListener("message", (event) => {
            store.dispatch(Store.EVENTS.NEW_MESSAGE, JSON.parse(event.data) as TMessage);
        });

        this.socket.addEventListener("error", (event) => {
            console.log("Ошибка", event);
        });
    }

    send(message: string) {
        this.socket?.send(JSON.stringify({
            content: message,
            type: "message"
        }));
    }
}

export const messagesController = new MessagesController();
