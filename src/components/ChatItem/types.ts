import { PlainObject } from "../../commonTypes.js";

export interface IChatItemProps extends PlainObject {
    id: number;
    title: string;
    avatar?: string;
    onClick: () => void;
}