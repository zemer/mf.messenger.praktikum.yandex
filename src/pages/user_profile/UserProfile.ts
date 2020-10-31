import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import NotEmptyField from "../../components/NotEmptyField/index.js";
import MailField from "../../components/MailField/index.js";
import PhoneField from "../../components/PhoneField/index.js";
import { IUserProfileProps } from "./types.js";
import Router from "../../utils/router.js";

export default class UserProfile extends Block<IUserProfileProps> {
    constructor() {
        const firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя"
        });

        const secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия"
        });

        const login = new LoginField({
            id: "login",
            label: "Логин"
        });

        const email = new MailField({
            id: "email",
            label: "Почта"
        });

        const phone = new PhoneField({
            id: "phone",
            label: "Телефон"
        });

        const oldPassword = new PasswordField({
            id: "oldPassword",
            label: "Старый пароль",
            type: "password"
        });

        const newPassword = new PasswordField({
            id: "newPassword",
            label: "Новый пароль",
            type: "password"
        });

        const button = new Button({
            value: "Сохранить",
            handleClick: () => {
                firtName.validate();
                secondName.validate();
                login.validate();
                email.validate();
                phone.validate();
                oldPassword.validate();
                newPassword.validate();
            }
        }, "button button-save");

        const backButton = new Button({
            value: "< Назад",
            handleClick: () => {
                Router.__instance.back();
            }
        }, "button");

        super("div", {
            firtName,
            secondName,
            login,
            email,
            phone,
            oldPassword,
            newPassword,
            button,
            backButton
        });
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            firtName: this.props.firtName.renderToString(),
            secondName: this.props.secondName.renderToString(),
            login: this.props.login.renderToString(),
            email: this.props.email.renderToString(),
            phone: this.props.phone.renderToString(),
            oldPassword: this.props.oldPassword.renderToString(),
            newPassword: this.props.newPassword.renderToString(),
            button: this.props.button.renderToString(),
            backButton: this.props.backButton.renderToString(),
        });

        return block;
    }
} 