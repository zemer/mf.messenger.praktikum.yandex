import { PlainObject } from "Common/commonTypes";

export interface ChatUserProps extends PlainObject {
    id: number;
    login: string;
    displayName: string;
    avatar?: string;
    deleteVisible: boolean;
    onClick?: () => void;
    onDelete?: () => void;
}
