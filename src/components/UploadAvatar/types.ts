import { PlainObject } from "../../commonTypes.js";

export interface IUploadAvatarProps extends PlainObject {
    imgId: string;
    source: string;
    handleClick: () => void;
}