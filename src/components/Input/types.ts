import { PlainObject } from "../../utils/isEqual.js";

export interface IInputProps extends PlainObject {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
}