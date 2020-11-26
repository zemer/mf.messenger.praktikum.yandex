import { InputWithLabelProps } from "Components/InputWithLabel/types";
import { ChatItemState } from "Store/interfaces";
import { PlainObject } from "Common/commonTypes";

export interface ChatListProps extends PlainObject {
    items: ChatItemState[];
}

export interface NewChatProps extends InputWithLabelProps {
    value: string;
}
