import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import { ILoginProps as ILoginProps } from "./interfaces.js";
import Link from "../../components/Link/index.js";
import { authController } from "../../controllers/AuthController.js";

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

                if (loginValidate && passwordValidate) {
                    authController.signIn(login.value ?? "", password.value ?? "");
                }
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

    componentDidMount() {
        super.componentDidMount();

        authController.checkSignUp();
    }

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