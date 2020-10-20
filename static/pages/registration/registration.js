import Block from "../../components/block/block.js";
import Button from "../../components/Button/Button.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/LoginField.js";
import PasswordField from "../../components/PasswordField/PasswordField.js";
import NotEmptyField from "../../components/NotEmptyField/NotEmptyField.js";
import MailField from "../../components/MailField/MailField.js";
import PhoneField from "../../components/PhoneField/PhoneField.js";
export default class Registration extends Block {
    constructor() {
        var firtName = new NotEmptyField({
            id: "first_name",
            label: "Имя"
        });
        var secondName = new NotEmptyField({
            id: "second_name",
            label: "Фамилия"
        });
        var login = new LoginField({
            id: "login",
            label: "Логин"
        });
        var email = new MailField({
            id: "email",
            label: "Почта"
        });
        var phone = new PhoneField({
            id: "phone",
            label: "Телефон"
        });
        var password = new PasswordField({
            id: "password",
            label: "Пароль",
            type: "password"
        });
        var button = new Button({
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
        super("div", {
            firtName,
            secondName,
            login,
            email,
            phone,
            password,
            button
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
        });
        return block;
    }
}
//# sourceMappingURL=registration.js.map