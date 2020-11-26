import { PlainObject } from "Common/commonTypes";

export interface InputWithLabelProps extends PlainObject {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    visible?: boolean;
}
