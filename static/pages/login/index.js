var _a;
import Button from "../../components/button/index.js";
import Input from "../../components/input/input.js";
var source = (_a = document.getElementById("entry-template")) === null || _a === void 0 ? void 0 : _a.innerHTML;
var template = Handlebars.compile(source);
var login = new Input({
    id: "login",
    label: "Логин"
});
var password = new Input({
    id: "password",
    label: "Пароль",
    type: "password"
});
var button = new Button({
    value: "Войти",
    class: "button button-login"
});
var context = {
    login: login.render(),
    password: password.render(),
    button: button.render()
};
var block = template(context);
document.body.innerHTML = block;
//# sourceMappingURL=index.js.map