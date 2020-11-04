import { PlainObject } from "../../utils/isEqual.js";
import Button from "../Button/index.js";
import MessageInput from "../MessageInput/index.js";

export interface ISendMessagProps extends PlainObject {
    message: MessageInput;
    button: Button;
}