import Block from "../../components/block/block.js";
import Button from "../../components/Button/Button.js";
import { template } from "./template.js";
import LoginField from "../../components/LoginField/LoginField.js";
import PasswordField from "../../components/PasswordField/PasswordField.js";
export default class Login extends Block {
    constructor() {
        var login = new LoginField({
            id: "login",
            label: "Логин"
        });
        var password = new PasswordField({
            id: "password",
            label: "Пароль",
            type: "password"
        });
        var button = new Button({
            value: "Войти",
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
//# sourceMappingURL=login.js.map