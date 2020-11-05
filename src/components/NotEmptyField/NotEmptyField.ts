import InputWithLabel from "../InputWithLabel/index.js";
import { INotEmptyFieldProps } from "./types.js";

export default class NotEmptyField extends InputWithLabel<INotEmptyFieldProps> {
    constructor(props: INotEmptyFieldProps) {
        super(props);
    }

    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Поле не может быть пустым";
        }

        return null;
    }
}