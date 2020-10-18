import Button from "../../components/button/index.js"
import Input from "../../components/input/input.js";

var source = document.getElementById("entry-template")?.innerHTML;
var template = Handlebars.compile(source);

var firtName = new Input({
    id: "first_name",
    label: "Имя"
});

var secondName = new Input({
    id: "second_name",
    label: "Фамилия"
});

var login = new Input({
    id: "login",
    label: "Логин"
});

var email = new Input({
    id: "email",
    label: "Почта"
});

var phone = new Input({
    id: "phone",
    label: "Телефон"
});

var password = new Input({
    id: "password",
    label: "Пароль",
    type: "password"
});

var button = new Button({
    value: "Зарегистрироваться",
    class: "button button-register"
});

var context = {
    firtName: firtName.render(),
    secondName: secondName.render(),
    login: login.render(),
    email: email.render(),
    phone: phone.render(),
    password: password.render(),
    button: button.render()
};
var block = template(context);

document.body.innerHTML = block;