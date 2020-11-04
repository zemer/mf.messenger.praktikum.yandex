import { PlainObject } from "../../utils/isEqual.js";

export interface LinkProps extends PlainObject {
    text: string;
    path: string;
}