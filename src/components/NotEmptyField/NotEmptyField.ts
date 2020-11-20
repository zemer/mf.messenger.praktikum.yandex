import { sanitize } from "../../utils/escape";
import InputWithLabel from "../InputWithLabel/index";
import { INotEmptyFieldProps } from "./types";

export default class NotEmptyField extends InputWithLabel<INotEmptyFieldProps> {
    constructor(props: INotEmptyFieldProps) {
        super(props);
    }

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