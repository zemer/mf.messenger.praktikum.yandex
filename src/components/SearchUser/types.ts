import { UserState } from "../../store/types.js";
import { PlainObject } from "../../utils/isEqual.js";

export interface FindUserProps extends PlainObject {
    users?: UserState[];
    onSelectUser: (id: number) => void;
}