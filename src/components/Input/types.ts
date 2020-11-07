import { PlainObject } from "../../commonTypes.js";

export interface InputProps extends PlainObject {
    id: string;
    type?: string;
    placeholder?: string;
    visible?: boolean;
}