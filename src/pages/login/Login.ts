import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import { ILoginProps as ILoginProps } from "./types.js";
import Router from "../../utils/router.js";
import Link from "../../components/Link/index.js";

export default class Login extends Block<ILoginProps> {
    constructor() {
        const login = new LoginField({
            id: "login",
            label: "Логин"
        });

        const password = new PasswordField({
            id: "password",
            label: "Пароль",
            type: "password"
        })

        const button = new Button({
            value: "Войти",
            handleClick: () => {
                const loginValidate = login.validate();
                const passwordValidate = password.validate();

                if (loginValidate && passwordValidate)
                    Router.__instance.go("/chats");
            }
        }, "button button-login");

        const toRegistration = new Link({
            text: "Регистрация",
            path: "/registration"
        }, "caption");

        super("div", {
            login,
            password,
            button,
            toRegistration
        });
    }

    //temp
    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            login: this.props.login.renderToString(),
            password: this.props.password.renderToString(),
            button: this.props.button.renderToString(),
            toRegistration: this.props.toRegistration.renderToString()
        });

        return block;
    }
} 