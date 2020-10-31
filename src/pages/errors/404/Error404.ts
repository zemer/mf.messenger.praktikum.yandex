import Block from "../../../components/Block/Block.js";
import { IError404Props } from "./types.js";
import { template } from "./template.js";

export default class Error404 extends Block<IError404Props> {
    constructor() {
        super("div", {}, "full-height zero-margin");
    }

    render() {
        const compile = Handlebars.compile(template);
        const block = compile({
            title: "404",
            description: `"Прицел 15, трубка 20! Бац! Бац... и мимо" (с)`
        });

        return block;
    }
} 