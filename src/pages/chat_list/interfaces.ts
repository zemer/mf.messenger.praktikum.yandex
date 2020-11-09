import { InputWithLabelProps } from "../../components/InputWithLabel/types.js";
import { ChatItemState } from "../../store/interfaces.js";
import { PlainObject } from "../../commonTypes.js";

export interface ChatListProps extends PlainObject {
    items: ChatItemState[];
}

export interface NewChatProps extends InputWithLabelProps {
    value: string;
}