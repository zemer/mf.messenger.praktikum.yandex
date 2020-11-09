import { UserState } from "../../store/interfaces.js";
import { PlainObject } from "../../commonTypes.js";

export interface FindUserProps extends PlainObject {
    users?: UserState[];
    onSelectUser?: (user: UserState) => void;
}