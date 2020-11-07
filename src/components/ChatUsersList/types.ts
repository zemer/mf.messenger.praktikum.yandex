import { UserState } from "../../store/types.js";
import { PlainObject } from "../../commonTypes.js";

export interface ChatUsersListProps extends PlainObject {
    users?: UserState[];
    onDeleteUser: (user: UserState) => void;
}