import Block from "Components/Block";
import Button from "Components/Button";
import LoginField from "Components/LoginField";
import PasswordField from "Components/PasswordField";
import NotEmptyField from "Components/NotEmptyField";
import MailField from "Components/MailField";
import PhoneField from "Components/PhoneField";
import Link from "Components/Link";
import { authController } from "Controllers/AuthController";
import { AppState, RegistrationState } from "Store/interfaces";
import getFieldByPath from "Utils/getFieldByPath";
import { Store, store } from "Store/Store";
import ErrorHelper from "Components/ErrorHelper";
import { RegistrationProps } from "./interfaces";
import template from "./template";

export default class Registration extends Block<RegistrationProps> {
    private firtName?: NotEmptyField;

    private secondName?: NotEmptyField;

    private login?: LoginField;

    private email?: MailField;

    private phone?: PhoneField;

    private password?: PasswordField;

    private button?: Button;

    private registrationError?: ErrorHelper;

    private toLogin?: Link;

    constructor() {
        super("div", {});
    }

    init() {
        store.subscribe(Store.EVENTS.REGISTRATION_FAILED, this.onChangeStore.bind(this));

        this.firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя"
        });

        this.secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия"
        });

        this.login = new LoginField({
            id: "login",
            label: "Логин"
        });

        this.email = new MailField({
            id: "email",
            label: "Почта"
        });

        this.phone = new PhoneField({
            id: "phone",
            label: "Телефон"
        });

        this.password = new PasswordField({
            id: "password",
            label: "Пароль",
            type: "password"
        });

        this.button = new Button({
            value: "Зарегистрироваться",
            handleClick: () => {
                const validation: boolean[] = [];

                validation.push(this.firtName?.validate() ?? false);
                validation.push(this.secondName?.validate() ?? false);
                validation.push(this.login?.validate() ?? false);
                validation.push(this.email?.validate() ?? false);
                validation.push(this.phone?.validate() ?? false);
                validation.push(this.password?.validate() ?? false);

                if (validation.every((v) => v)) {
                    authController.signUp({
                        first_name: this.firtName?.value ?? "",
                        second_name: this.secondName?.value ?? "",
                        email: this.email?.value ?? "",
                        login: this.login?.value ?? "",
                        password: this.password?.value ?? "",
                        phone: this.phone?.value ?? ""
                    });
                }
            }
        }, "button button-register");

        this.registrationError = new ErrorHelper({
        });

        this.toLogin = new Link({
            text: "Войти",
            path: "/login"
        }, "caption");

        super.init();
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            firtName: this.firtName?.renderToString(),
            secondName: this.secondName?.renderToString(),
            login: this.login?.renderToString(),
            email: this.email?.renderToString(),
            phone: this.phone?.renderToString(),
            password: this.password?.renderToString(),
            button: this.button?.renderToString(),
            registrationError: this.registrationError?.renderToString(),
            toLogin: this.toLogin?.renderToString()
        });

        return block;
    }

    loginSelector(state: AppState) {
        return getFieldByPath(state, "registration") as RegistrationState;
    }

    onChangeStore() {
        const registration = this.loginSelector(store.getState());

        if (this.registrationError) {
            if (registration.error) {
                this.registrationError.setProps({
                    ...this.registrationError.props,
                    errorText: registration.error
                });

                this.registrationError.show();
            } else {
                this.registrationError.hide();
            }
        }
    }
}
