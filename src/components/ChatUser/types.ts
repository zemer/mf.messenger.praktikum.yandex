import { PlainObject } from "../../utils/isEqual.js";

export interface ChatUserProps extends PlainObject {
    id: number;
    displayName: string;
    avatar?: string;
    // onClick: () => void;
}