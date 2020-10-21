import ChatItem from "../../../components/ChatItem/index.js";
import CompanionMessage from "../../../components/CompanionMessage/index.js";
import OwnMessage from "../../../components/OwnMessage/index.js";
import SendMessage from "../../../components/SendMessage/index.js";

export interface IChatProps {
    items: ChatItem[];
    user: string;
    messages: (CompanionMessage | OwnMessage)[];
    sendMessage: SendMessage;
}