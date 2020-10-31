import ChatItem from "../../../components/ChatItem/index.js";
import Link from "../../../components/Link/index.js";

export interface IChatListProps {
    items: ChatItem[];
    toProfile: Link;
}