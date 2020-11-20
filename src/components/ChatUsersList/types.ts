import { UserState } from "../../store/interfaces";
import { PlainObject } from "../../commonTypes";

export interface ChatUsersListProps extends PlainObject {
    users?: UserState[];
    onDeleteUser: (user: UserState) => void;
}