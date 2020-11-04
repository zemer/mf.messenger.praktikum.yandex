import { PlainObject } from "../../utils/isEqual";

export interface IChatItemProps extends PlainObject {
    id: number;
    title: string;
    avatar?: string;
}