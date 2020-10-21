import Input from "../Input/index.js";

export default class PasswordField extends Input {
    constructor(props) {
        super(props);
    }

    checkValidation(value: string | null): string | null {
        if (!value)
            return "Пароль не может быть пустым";

        var nameRegex = /^[a-zA-Z\d]+$/;
        if (value.match(nameRegex) == null) {
            return "Пароль может содержать латинские символы и цифры";
        }

        return null;
    }
}