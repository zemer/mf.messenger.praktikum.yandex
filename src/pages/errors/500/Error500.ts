import Block from "../../../components/Block/Block.js";
import { IError500Props } from "./interfaces.js";
import { template } from "./template.js";
import Link from "../../../components/Link/index.js";

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