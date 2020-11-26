import { PlainObject } from "Common/commonTypes";

export interface IChatItemProps extends PlainObject {
    id: number;
    title: string;
    avatar?: string;
    onClick: () => void;
}
