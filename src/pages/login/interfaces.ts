import Button from "../../components/Button/index.js";
import Link from "../../components/Link/index.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import { PlainObject } from "../../commonTypes.js";

export interface ILoginProps extends PlainObject {
    login: LoginField;
    password: PasswordField;
    button: Button;
    toRegistration: Link;
}