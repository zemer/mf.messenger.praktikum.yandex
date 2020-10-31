import Block from "../../../components/Block/Block.js";
import { IError500Props } from "./types.js";
import { template } from "./template.js";

export default class Error404 extends Block<IError500Props> {
    constructor() {
        super("div", {}, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            title: "500",
            description: "Ведутся работы"
        });

        return block;
    }
} 