import { UserState } from "../../store/types.js";
import { PlainObject } from "../../utils/isEqual.js";

export interface ChatUsersListProps extends PlainObject {
    users?: UserState[];
}