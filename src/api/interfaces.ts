import { StringIndexed } from "Common/commonTypes";

export interface ChnageUserProfileRequest extends StringIndexed {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}
