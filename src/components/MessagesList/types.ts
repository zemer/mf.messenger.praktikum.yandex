import { PlainObject } from "../../commonTypes";
import { TMessage } from "../../store/types";

export interface MessagesListProps extends PlainObject {
    userId: number;
    messages?: TMessage[];
}
