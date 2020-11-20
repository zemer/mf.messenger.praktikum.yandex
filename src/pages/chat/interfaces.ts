import { UserState } from "../../store/interfaces";
import { PlainObject } from "../../commonTypes";

export interface ChatProps extends PlainObject {
    chatId: number;
    title: string;
    users?: UserState[];
}