import { PlainObject } from "../../commonTypes.js";

export interface CreateChatProps extends PlainObject {
    onCreateChat: (title: string) => void;
}