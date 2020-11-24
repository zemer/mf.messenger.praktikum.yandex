import { UserState } from "../../store/interfaces";
import { PlainObject } from "../../commonTypes";
import { TMessage } from "../../store/types";

export interface ChatProps extends PlainObject {
    chatId: number;
    title: string;
    profile?: UserState;
    users?: UserState[];
    messages?: TMessage[];
}
