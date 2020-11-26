import { UserState } from "Store/interfaces";
import { PlainObject } from "Common/commonTypes";

export interface FindUserProps extends PlainObject {
    users?: UserState[];
    onSelectUser?: (user: UserState) => void;
}
