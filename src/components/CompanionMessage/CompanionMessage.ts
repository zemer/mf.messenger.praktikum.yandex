import Message from "Components/Message";
import IMessageProps from "Components/Message/types";

export default class CompanionMessage extends Message {
    constructor(props: IMessageProps) {
        super(props, "message message-companion column-container body-font");
    }
}
