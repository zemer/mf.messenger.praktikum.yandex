import InputWithLabel from "Components/InputWithLabel";
import { ILoginFieldProps } from "./types";

export default class LoginField extends InputWithLabel<ILoginFieldProps> {
    checkValidation(value: string | null): string | null {
        if (!value) {
            return "Логин не может быть пустым";
        }

        if (value.length > 50) {
            return "Логин не может быть больше 50 символов";
        }

        const nameRegex = /^[a-zA-Z]+$/;
        if (value.match(nameRegex) == null) {
            return "Логин может содержать только латинские символы";
        }

        return null;
    }
}
