import { PlainObject } from "../../utils/isEqual.js";

export interface ChatUserProps extends PlainObject {
    id: number;
    login: string;
    displayName: string;
    avatar?: string;
    // onClick: () => void;
}