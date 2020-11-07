import { PlainObject } from "../../commonTypes.js";
import Button from "../Button/index.js";
import MessageInput from "../MessageInput/index.js";

export interface ISendMessagProps extends PlainObject {
    message: MessageInput;
    button: Button;
}