import { UserState } from "../../store/types.js";
import { PlainObject } from "../../utils/isEqual.js";

export interface ChatProps extends PlainObject {
    chatId: number;
    users?: UserState[];
    //items: ChatItem[];
    //user: string;
    //messages: (CompanionMessage | OwnMessage)[];
    //sendMessage: SendMessage;
    //toProfile: Link;
}