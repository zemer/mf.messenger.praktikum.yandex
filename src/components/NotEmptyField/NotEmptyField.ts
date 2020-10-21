import Input from "../input/index.js";

export default class NotEmptyField extends Input {
    constructor(props) {
        super(props);
    }

    checkValidation(value: string | null): string | null {
        if (!value)
            return "Поле не может быть пустым";

        return null;
    }
}