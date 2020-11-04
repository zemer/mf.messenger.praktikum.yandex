import Button from "../../components/Button/index.js";
import ChatItem from "../../components/ChatItem/index.js";
import { PlainObject } from "../../utils/isEqual.js";

export interface IChatListProps extends PlainObject {
    items: ChatItem[];
    toProfile: Button;
}