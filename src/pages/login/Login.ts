import Block from "Components/Block";
import Button from "Components/Button";
import LoginField from "Components/LoginField";
import PasswordField from "Components/PasswordField";
import Link from "Components/Link";
import { authController } from "Controllers/AuthController";
import ErrorHelper from "Components/ErrorHelper/index";
import { Store, store } from "Store/Store";
import { AppState, LoginState } from "Store/interfaces";
import getFieldByPath from "Utils/getFieldByPath";
import template from "./template";
import { ILoginProps } from "./interfaces";

export default class Login extends Block<ILoginProps> {
    private login?: LoginField;

    private password?: PasswordField;

    private button?: Button;

    private loginError?: ErrorHelper;

    private toRegistration?: Link;

    constructor() {
        super("div", {});
    }

    init() {
        store.subscribe(Store.EVENTS.SIGN_IN_FAILED, this.onChangeStore.bind(this));

        this.login = new LoginField({
            id: "login",
            label: "Логин"
        });

        this.password = new PasswordField({
            id: "password",
            label: "Пароль",
            type: "password"
        });

        this.button = new Button({
            value: "Войти",
            handleClick: () => {
                const loginValidate = this.login?.validate();
                const passwordValidate = this.password?.validate();

                if (loginValidate && passwordValidate) {
                    authController.signIn(this.login?.value ?? "", this.password?.value ?? "");
                }
            }
        }, "button button-login");

        this.loginError = new ErrorHelper({
        });

        this.toRegistration = new Link({
            text: "Регистрация",
            path: "/registration"
        }, "caption");

        super.init();
    }

    componentDidMount() {
        super.componentDidMount();

        authController.checkSignUp();
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            login: this.login?.renderToString(),
            password: this.password?.renderToString(),
            button: this.button?.renderToString(),
            loginError: this.loginError?.renderToString(),
            toRegistration: this.toRegistration?.renderToString()
        });

        return block;
    }

    loginSelector(state: AppState) {
        return getFieldByPath(state, "login") as LoginState;
    }

    onChangeStore() {
        const login = this.loginSelector(store.getState());

        if (this.loginError) {
            if (login.error) {
                this.loginError.setProps({
                    ...this.loginError.props,
                    errorText: login.error
                });

                this.loginError.show();
            } else {
                this.loginError.hide();
            }
        }
    }
}
