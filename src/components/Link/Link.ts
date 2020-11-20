import Router from "../../utils/router";
import Block from "../Block/index";
import { LinkProps } from "./types";

export default class Link extends Block<LinkProps> {
    constructor(props: LinkProps, classes: string | null = null) {
        super("a", props, classes);

        this.handleClick = this.handleClick.bind(this);
    }

    render(): string {
        if (this._element)
            this._element.setAttribute("href", this.props.path);

        return this.props.text;
    }

    setEvents() {
        if (this._element) {
            this._element.addEventListener("click", this.handleClick, true);
        }
    }

    handleClick(ev: MouseEvent) {
        ev.preventDefault();
        Router.go(this.props.path);
    }
}