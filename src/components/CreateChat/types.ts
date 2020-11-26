import { PlainObject } from "Common/commonTypes";

export interface CreateChatProps extends PlainObject {
    onCreateChat: (title: string) => void;
}
