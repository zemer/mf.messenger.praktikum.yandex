import { UserState } from "../../store/types.js";
import { PlainObject } from "../../commonTypes.js";

export interface ChatProps extends PlainObject {
    chatId: number;
    title: string;
    users?: UserState[];
}