import ChatItem from "../../../components/ChatItem/index.js";
import CompanionMessage from "../../../components/CompanionMessage/index.js";
import Link from "../../../components/Link/index.js";
import OwnMessage from "../../../components/OwnMessage/index.js";
import SendMessage from "../../../components/SendMessage/index.js";
import { PlainObject } from "../../../utils/isEqual.js";

export interface IChatProps extends PlainObject {
    items: ChatItem[];
    user: string;
    messages: (CompanionMessage | OwnMessage)[];
    sendMessage: SendMessage;
    toProfile: Link;
}