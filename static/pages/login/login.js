import Block from "../../components/block/block.js";
import Button from "../../components/button/button.js";
import { template } from "./template.js";
import Input from "../../components/input/input.js";
export default class Login extends Block {
    constructor() {
        var login = new Input({
            id: "login",
            label: "Логин",
            handleChange: () => { console.log("change"); },
            handleFocus: () => { console.log("focus"); },
            handleBlur: () => { console.log("blur"); },
        });
        var button = new Button({
            value: "Войти",
            handleClick: () => { console.log("444"); }
        }, "button button-login");
        super("div", {
            login: login,
            button: button
        });
        console.log(this.props);
    }
    componentDidMount() {
        setTimeout(() => {
            const login = this.props.login;
            login.setProps(Object.assign(Object.assign({}, login.props), { label: "Login 3" }));
        }, 5000);
    }
    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            login: this.props.login.renderToString(),
            button: this.props.button.renderToString()
        });
        return block;
    }
}
//# sourceMappingURL=login.js.map