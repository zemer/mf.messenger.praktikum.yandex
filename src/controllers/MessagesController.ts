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

            this.socket?.send(JSON.stringify({
                content: "0",
                type: "get old"
            }));

            this.keepTimer = setInterval(() => {
                this.socket?.send("connection");
            }, 7000);
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
            const data = JSON.parse(event.data);

            if (Array.isArray(data)) {
                const messages = data.reverse().map((m: TMessage) => {
                    const newMessage = m;
                    // eslint-disable-next-line @typescript-eslint/dot-notation
                    newMessage.userId = (m as any)["user_id"]; // Косяк в API (поля разные)
                    return newMessage;
                });

                store.dispatch(Store.EVENTS.OLD_MESSAGES, messages);
            } else {
                const { type } = data;

                switch (type) {
                    case "user connected": {
                        store.dispatch(Store.EVENTS.USER_ENTER, JSON.parse(data.content) as number);
                        break;
                    }

                    case "error": {
                        return;
                    }

                    default: {
                        store.dispatch(Store.EVENTS.NEW_MESSAGE, data as TMessage);
                    }
                }
            }
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
