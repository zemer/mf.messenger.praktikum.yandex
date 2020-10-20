import Input from "../input/input.js";

export default class LoginField extends Input {
    constructor(props) {
        super(props);
    }

    checkValidation(ev: FocusEvent): string | null {
        const value = (ev.target as HTMLInputElement).value;

        if (!value)
            return "Логин не может быть пустым";

        var nameRegex = /^[a-zA-Z]+$/;
        if (value.match(nameRegex) == null) {
            return "Логин может содержать только латинские символы";
        }

        return null;
    }
}