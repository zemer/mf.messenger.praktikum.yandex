import { PlainObject } from "../../commonTypes";
import { TMessage } from "../../store/types";

export default interface IMessageProps extends PlainObject {
    username: string;
    content: TMessage;
}
