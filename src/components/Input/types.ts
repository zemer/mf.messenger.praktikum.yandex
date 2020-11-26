import { PlainObject } from "Common/commonTypes";

export interface InputProps extends PlainObject {
    id: string;
    type?: string;
    placeholder?: string;
    visible?: boolean;
}
