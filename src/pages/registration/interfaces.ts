import Button from "../../components/Button/index";
import Link from "../../components/Link/index";
import LoginField from "../../components/LoginField/index";
import MailField from "../../components/MailField/index";
import NotEmptyField from "../../components/NotEmptyField/index";
import PasswordField from "../../components/PasswordField/index";
import PhoneField from "../../components/PhoneField/index";
import { PlainObject } from "../../commonTypes";

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
