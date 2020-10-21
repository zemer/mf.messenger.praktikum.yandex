import Input from "../Input/index.js";

export default class MailField extends Input {
    constructor(props) {
        super({ ...props, placeholder: "mail@yandex.ru" });
    }

    checkValidation(value: string | null): string | null {
        if (!value)
            return "Почта не может быть пустой";

        var nameRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (value.match(nameRegex) == null) {
            return "Неверный формат";
        }

        return null;
    }
}