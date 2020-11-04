import { PlainObject } from "../../utils/isEqual.js";

export interface IUploadAvatarProps extends PlainObject {
    inputId: string;
    source: string;
    handleClick: () => void;
}