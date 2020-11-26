import Block from "Components/Block";
import Link from "Components/Link";
import { IError500Props } from "./interfaces";
import template from "./template";

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
