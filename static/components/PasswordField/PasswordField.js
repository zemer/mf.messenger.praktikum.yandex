import Input from "../input/input.js";
export default class PasswordField extends Input {
    constructor(props) {
        super(props);
    }
    checkValidation(value) {
        if (!value)
            return "Пароль не может быть пустым";
        var nameRegex = /^[a-zA-Z\d]+$/;
        if (value.match(nameRegex) == null) {
            return "Пароль может содержать латинские символы и цифры";
        }
        return null;
    }
}
//# sourceMappingURL=PasswordField.js.map