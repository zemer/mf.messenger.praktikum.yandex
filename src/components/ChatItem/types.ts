import { PlainObject } from "../../commonTypes";

export interface IChatItemProps extends PlainObject {
    id: number;
    title: string;
    avatar?: string;
    onClick: () => void;
}
