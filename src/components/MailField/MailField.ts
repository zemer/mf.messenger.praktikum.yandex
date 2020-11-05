import InputWithLabel from "../InputWithLabel/index.js";
import { IMailFieldProps } from "./types.js";

export default class MailField extends InputWithLabel<IMailFieldProps> {
    constructor(props: IMailFieldProps) {
        super({
            ...props,
            placeholder: props.placeholder ?? "mail@yandex.ru",
            type: "text"
        });
    }

    checkValidation(value?: string | null): string | null {
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