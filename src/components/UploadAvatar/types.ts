import { PlainObject } from "../../utils/isEqual.js";

export interface IUploadAvatarProps extends PlainObject {
    imgId: string;
    source: string;
    handleClick: () => void;
}