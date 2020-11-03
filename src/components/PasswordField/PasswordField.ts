import Input from "../Input/index.js";
import { IPasswordFieldProps } from "./types.js";

export default class PasswordField extends Input<IPasswordFieldProps> {
    constructor(props: IPasswordFieldProps) {
        super(props);
    }

    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Пароль не может быть пустым";
        }

        const nameRegex = /^[a-zA-Z\d]+$/;
        if (value.match(nameRegex) == null) {
            return "Пароль может содержать латинские символы и цифры";
        }

        return null;
    }
}