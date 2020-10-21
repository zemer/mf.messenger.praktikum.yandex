import Input from "../Input/index.js";
import { IMailFieldProps } from "./types.js";

export default class MailField extends Input<IMailFieldProps> {
    constructor(props: IMailFieldProps) {
        super({ ...props, placeholder: "mail@yandex.ru", type: "text" });
    }

    checkValidation(value: string | null): string | null {
        if (!value) {
            return "Почта не может быть пустой";
        }

        const nameRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (value.match(nameRegex) == null) {
            return "Неверный формат";
        }

        return null;
    }
}