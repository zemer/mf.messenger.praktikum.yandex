import Message from "Components/Message";
import IMessageProps from "Components/Message/types";

export default class OwnMessage extends Message {
    constructor(props: IMessageProps) {
        super(props, "message message-own column-container body-font");
    }
}
