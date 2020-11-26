import InputWithLabel from "Components/InputWithLabel";
import { IMailFieldProps } from "./types";

export default class MailField extends InputWithLabel<IMailFieldProps> {
    constructor(props: IMailFieldProps) {
        super({
            ...props,
            placeholder: props.placeholder || "mail@yandex.ru",
            type: "text"
        });
    }

    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Почта не может быть пустой";
        }

        if (value.length > 50) {
            return "Почта не может быть больше 50 символов";
        }

        const nameRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (value.match(nameRegex) == null) {
            return "Неверный формат";
        }

        return null;
    }
}
