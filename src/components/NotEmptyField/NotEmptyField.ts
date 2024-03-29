import sanitize from "Utils/escape";
import InputWithLabel from "Components/InputWithLabel";
import { INotEmptyFieldProps } from "./types";

export default class NotEmptyField extends InputWithLabel<INotEmptyFieldProps> {
    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Поле не может быть пустым";
        }

        if (sanitize(value) !== value) {
            return "Поле содержит недопустимые символы";
        }

        if (value.length > 50) {
            return "Поле не может быть больше 50 символов";
        }

        return null;
    }
}
