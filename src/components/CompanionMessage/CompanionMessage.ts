import Message from "../Message";
import IMessageProps from "../Message/types";

export default class CompanionMessage extends Message {
    constructor(props: IMessageProps) {
        super(props, "message message-companion column-container body-font");
    }
}
