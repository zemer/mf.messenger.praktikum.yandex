import Button from "../../components/Button/index.js";
import Link from "../../components/Link/index.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";

export interface ILoginProps {
    login: LoginField;
    password: PasswordField;
    button: Button;
    toRegistration: Link;
    logout: Button;
}