import { UserState } from "../../store/interfaces.js";
import { PlainObject } from "../../commonTypes.js";

export interface ChatProps extends PlainObject {
    chatId: number;
    title: string;
    users?: UserState[];
}