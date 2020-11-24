import { PlainObject } from "../../commonTypes";
import { TMessage, TProfile } from "../../store/types";

export interface MessagesListProps extends PlainObject {
    profile: TProfile,
    users: TProfile[],
    messages?: TMessage[];
}
