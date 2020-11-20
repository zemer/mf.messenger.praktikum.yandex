import { PlainObject } from "../../commonTypes";

export interface IButtonProps extends PlainObject {
    value: string;
    handleClick: () => void;
}