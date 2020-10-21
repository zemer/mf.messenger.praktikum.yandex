import Input from "../Input/index.js";

export default class LoginField extends Input {
    constructor(props) {
        super(props);
    }

    checkValidation(value: string | null): string | null {
        if (!value)
            return "Логин не может быть пустым";

        var nameRegex = /^[a-zA-Z]+$/;
        if (value.match(nameRegex) == null) {
            return "Логин может содержать только латинские символы";
        }

        return null;
    }
}