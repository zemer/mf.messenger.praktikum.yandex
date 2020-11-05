import { InputWithLabelProps } from "../../components/InputWithLabel/types.js";
import { ChatItemState } from "../../store/types.js";
import { PlainObject } from "../../utils/isEqual.js";

export interface ChatListProps extends PlainObject {
    items: ChatItemState[];
}

export interface NewChatProps extends InputWithLabelProps {
    value: string;
}