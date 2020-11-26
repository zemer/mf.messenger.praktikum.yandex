import { PlainObject } from "Common/commonTypes";

export interface ISendMessageProps extends PlainObject {
    onSend: (message: string) => void;
}
