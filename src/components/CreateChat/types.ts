import { PlainObject } from "../../commonTypes";

export interface CreateChatProps extends PlainObject {
    onCreateChat: (title: string) => void;
}