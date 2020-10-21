import Input from "../Input/index.js";
export default class NotEmptyField extends Input {
    constructor(props) {
        super(props);
    }
    checkValidation(value) {
        if (!value)
            return "Поле не может быть пустым";
        return null;
    }
}
//# sourceMappingURL=NotEmptyField.js.map