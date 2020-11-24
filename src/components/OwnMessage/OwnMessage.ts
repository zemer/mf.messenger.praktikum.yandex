import Message from "../Message";
import IMessageProps from "../Message/types";

export default class OwnMessage extends Message {
    constructor(props: IMessageProps) {
        super(props, "message message-own column-container body-font");
    }
}
