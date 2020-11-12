import Block from "../../components/Block/index.js";
import Button from "../../components/Button/index.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/index.js";
import PasswordField from "../../components/PasswordField/index.js";
import { ILoginProps as ILoginProps } from "./interfaces.js";
import Link from "../../components/Link/index.js";
import { authController } from "../../controllers/AuthController.js";
import ErrorHelper from "../../components/ErrorHelper/index.js";
import { Store, store } from "../../store/Store.js";
import { AppState, LoginState } from "../../store/interfaces.js";
import getFieldByPath from "../../utils/getFieldByPath.js";

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
        })

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
            }
            else {
                this.loginError.hide();
            }
        }
    }
} 