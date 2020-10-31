import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import NotEmptyField from "../../components/NotEmptyField/index.js";
import MailField from "../../components/MailField/index.js";
import PhoneField from "../../components/PhoneField/index.js";
import { RegistrationProps as RegistrationProps } from "./types.js";
import Link from "../../components/Link/index.js";

export default class Registration extends Block<RegistrationProps> {
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

                const password = new PasswordField({
                        id: "password",
                        label: "Пароль",
                        type: "password"
                });

                const button = new Button({
                        value: "Зарегистрироваться",
                        handleClick: () => {
                                firtName.validate();
                                secondName.validate();
                                login.validate();
                                email.validate();
                                phone.validate();
                                password.validate();
                        }
                }, "button button-register");

                const toLogin = new Link({
                        text: "Войти",
                        path: "/login"
                }, "caption");

                super("div", {
                        firtName,
                        secondName,
                        login,
                        email,
                        phone,
                        password,
                        button,
                        toLogin
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
                        password: this.props.password.renderToString(),
                        button: this.props.button.renderToString(),
                        toLogin: this.props.toLogin.renderToString()
                });

                return block;
        }
} 