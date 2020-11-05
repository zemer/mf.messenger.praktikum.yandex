import { PlainObject } from "../../utils/isEqual.js";

export interface IChatItemProps extends PlainObject {
    id: number;
    title: string;
    avatar?: string;
}