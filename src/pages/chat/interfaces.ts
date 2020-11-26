import { UserState } from "Store/interfaces";
import { PlainObject } from "Common/commonTypes";
import { TMessage } from "Store/types";

export interface ChatProps extends PlainObject {
    chatId: number;
    title: string;
    profile?: UserState;
    users?: UserState[];
    messages?: TMessage[];
}
