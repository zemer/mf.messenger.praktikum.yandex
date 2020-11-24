import { PlainObject } from "../../commonTypes";

export interface ISendMessageProps extends PlainObject {
    onSend: (message: string) => void;
}
