import { PlainObject } from "../../utils/isEqual.js";

export interface IButtonProps extends PlainObject {
    value: string;
    handleClick: () => void;
}