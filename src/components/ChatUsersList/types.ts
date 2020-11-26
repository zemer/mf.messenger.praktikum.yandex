import { UserState } from "Store/interfaces";
import { PlainObject } from "Common/commonTypes";

export interface ChatUsersListProps extends PlainObject {
    users?: UserState[];
    onDeleteUser: (user: UserState) => void;
}
