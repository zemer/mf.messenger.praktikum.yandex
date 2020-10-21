import Input from "../Input/index.js";
export default class PhoneField extends Input {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { placeholder: "+7(999)123-456-78-90" }));
    }
    checkValidation(value) {
        if (!value)
            return "Не указан телефон";
        var nameRegex = /^[\+]?[0-9]{1}[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/;
        if (value.match(nameRegex) == null) {
            return "Неверный формат";
        }
        return null;
    }
}
//# sourceMappingURL=PhoneField.js.map