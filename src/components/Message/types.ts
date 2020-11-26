import { PlainObject } from "Common/commonTypes";
import { TMessage } from "Store/types";

export default interface IMessageProps extends PlainObject {
    username: string;
    content: TMessage;
}
