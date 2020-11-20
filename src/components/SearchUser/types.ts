import { UserState } from "../../store/interfaces";
import { PlainObject } from "../../commonTypes";

export interface FindUserProps extends PlainObject {
    users?: UserState[];
    onSelectUser?: (user: UserState) => void;
}