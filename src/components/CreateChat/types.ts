import { PlainObject } from "../../utils/isEqual.js";

export interface CreateChatProps extends PlainObject {
    onCreateChat: (title: string) => void;
}