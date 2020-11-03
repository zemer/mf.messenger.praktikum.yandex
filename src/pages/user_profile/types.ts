import Button from "../../components/Button/index.js";
import LoginField from "../../components/LoginField/index.js";
import MailField from "../../components/MailField/index.js";
import NotEmptyField from "../../components/NotEmptyField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import PhoneField from "../../components/PhoneField/index.js";

export interface IUserProfileProps {
    firtName: NotEmptyField;
    secondName: NotEmptyField;
    login: LoginField;
    email: MailField;
    phone: PhoneField;
    oldPassword: PasswordField;
    newPassword: PasswordField;
    button: Button;
    backButton: Button;
    logoutButton: Button;
}