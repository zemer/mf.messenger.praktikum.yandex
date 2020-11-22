import { PlainObject } from "../../commonTypes";

export interface InputProps extends PlainObject {
    id: string;
    type?: string;
    placeholder?: string;
    visible?: boolean;
}
