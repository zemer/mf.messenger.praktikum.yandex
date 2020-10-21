import Input from "../Input/index.js";
export default class MailField extends Input {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { placeholder: "mail@yandex.ru", type: "text" }));
    }
    checkValidation(value) {
        if (!value)
            return "Почта не может быть пустой";
        var nameRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
        if (value.match(nameRegex) == null) {
            return "Неверный формат";
        }
        return null;
    }
}
//# sourceMappingURL=MailField.js.map