import Button from "../../../components/Button/index.js";
import ChatItem from "../../../components/ChatItem/index.js";

export interface IChatListProps {
    items: ChatItem[];
    toProfile: Button;
}