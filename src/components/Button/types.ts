import { PlainObject } from "../../commonTypes.js";

export interface IButtonProps extends PlainObject {
    value: string;
    handleClick: () => void;
}