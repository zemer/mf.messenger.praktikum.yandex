import Block from "../../../components/Block/Block";
import { IError500Props } from "./interfaces";
import template from "./template";
import Link from "../../../components/Link/index";

export default class Error404 extends Block<IError500Props> {
    constructor() {
        const toLogin = new Link({
            text: "Войти в #ЧАТ",
            path: "/login"
        });

        super("div", {
            toLogin
        }, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            title: "500",
            description: "Ведутся работы",
            toLogin: this.props.toLogin.renderToString()
        });

        return block;
    }
}
