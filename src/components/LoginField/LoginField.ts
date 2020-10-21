import Input from "../Input/index.js";
import { ILoginFieldProps } from "./types.js";

export default class LoginField extends Input<ILoginFieldProps> {
    constructor(props: ILoginFieldProps) {
        super(props);
    }

    checkValidation(value: string | null): string | null {
        if (!value) {
            return "Логин не может быть пустым";
        }

        const nameRegex = /^[a-zA-Z]+$/;
        if (value.match(nameRegex) == null) {
            return "Логин может содержать только латинские символы";
        }

        return null;
    }
}