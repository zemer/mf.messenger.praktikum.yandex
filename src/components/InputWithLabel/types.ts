import { PlainObject } from "../../utils/isEqual.js";

export interface InputWithLabelProps extends PlainObject {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    visible?: boolean;
}