import InputWithLabel from "Components/InputWithLabel/index";
import { IPasswordFieldProps } from "./types";

export default class PasswordField extends InputWithLabel<IPasswordFieldProps> {
    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Пароль не может быть пустым";
        }

        if (value.length < 8) {
            return "Пароль не может быть меньше 8 символов";
        }

        if (value.length > 50) {
            return "Пароль не может быть больше 50 символов";
        }

        const nameRegex = /^[a-zA-Z\d]+$/;
        if (!value.match(nameRegex)) {
            return "Пароль может содержать латинские символы и цифры";
        }

        return null;
    }
}
