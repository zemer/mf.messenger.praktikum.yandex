import InputWithLabel from "Components/InputWithLabel/index";
import { IPhoneFieldProps } from "./types";

export default class PhoneField extends InputWithLabel<IPhoneFieldProps> {
    constructor(props: IPhoneFieldProps) {
        super({
            ...props,
            placeholder: props.placeholder || "+7(999)456-78-90"
        });
    }

    checkValidation(value?: string | null): string | null {
        if (!value) {
            return "Не указан телефон";
        }

        if (value.length > 20) {
            return "Телефон не может быть больше 20 символов";
        }

        const nameRegex = /^[\+]?[0-9]{1}[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{2}$/;
        if (!value.match(nameRegex)) {
            return "Неверный формат";
        }

        return null;
    }
}
