import { UserState } from "../../store/types.js";
import { PlainObject } from "../../commonTypes.js";

export interface FindUserProps extends PlainObject {
    users?: UserState[];
    onSelectUser?: (user: UserState) => void;
}