import { PlainObject } from "Common/commonTypes";

export interface IUploadAvatarProps extends PlainObject {
    imgId: string;
    source: string;
    handleClick: () => void;
}
