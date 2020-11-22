import { InputWithLabelProps } from "../../components/InputWithLabel/types";
import { ChatItemState } from "../../store/interfaces";
import { PlainObject } from "../../commonTypes";

export interface ChatListProps extends PlainObject {
    items: ChatItemState[];
}

export interface NewChatProps extends InputWithLabelProps {
    value: string;
}
