import { PlainObject } from "../../commonTypes";

export interface IUploadAvatarProps extends PlainObject {
    imgId: string;
    source: string;
    handleClick: () => void;
}
