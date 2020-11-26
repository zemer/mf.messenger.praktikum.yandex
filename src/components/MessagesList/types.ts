import { PlainObject } from "Common/commonTypes";
import { TMessage, TProfile } from "Store/types";

export interface MessagesListProps extends PlainObject {
    profile: TProfile,
    users: TProfile[],
    messages?: TMessage[];
}
