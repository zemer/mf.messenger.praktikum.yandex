import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import { ILoginProps } from "./types.js";
import Router from "../../utils/router.js";

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
                if (login.validate() && password.validate())
                    Router.__instance.go("/chats");
            }
        }, "button button-login");

        super("div", {
            login,
            password,
            button
        });
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            login: this.props.login.renderToString(),
            password: this.props.password.renderToString(),
            button: this.props.button.renderToString()
        });

        return block;
    }
} 