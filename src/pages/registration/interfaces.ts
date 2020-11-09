import Button from "../../components/Button/index.js";
import Link from "../../components/Link/index.js";
import LoginField from "../../components/LoginField/index.js";
import MailField from "../../components/MailField/index.js";
import NotEmptyField from "../../components/NotEmptyField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import PhoneField from "../../components/PhoneField/index.js";
import { PlainObject } from "../../commonTypes.js";

export interface RegistrationProps extends PlainObject {
    firtName: NotEmptyField;
    secondName: NotEmptyField;
    login: LoginField;
    email: MailField;
    phone: PhoneField;
    password: PasswordField;
    button: Button;
    toLogin: Link;
}