import { PlainObject } from "../../commonTypes";
import Button from "../Button/index";
import MessageInput from "../MessageInput/index";

export interface ISendMessagProps extends PlainObject {
    message: MessageInput;
    button: Button;
}