import { PlainObject } from "Common/commonTypes";

export interface IButtonProps extends PlainObject {
    value: string;
    handleClick: () => void;
}
