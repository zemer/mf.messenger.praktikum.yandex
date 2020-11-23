import Block from "../components/Block/Block";
import { clear, render } from "./renderDOM";

export default class Route {
    private pathname: string;

    private blockClass: any;

    private block: Block<any> | null;

    private props: any;

    private pattern: RegExp;

    constructor(pathname: string, view: unknown, props: unknown) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;

        this.pattern = new RegExp(`^${pathname.replace(/:(\w+)/g, "(?<$1>\\w+)")}$`);
    }

    leave() {
        if (this.block) {
            this.block.hide();
            clear(this.props.rootQuery, this.block);
            this.block = null;
        }
    }

    isEqualPaths(lhs: string, rhs: string) {
        return lhs === rhs;
    }

    match(pathname: string): boolean {
        if (this.isEqualPaths(pathname, this.pathname)) return true;

        const args = pathname.match(this.pattern);
        if (args) return true;

        return false;
    }

    render(pathname: string) {
        if (!this.block) {
            const args = pathname.match(this.pattern);

            // eslint-disable-next-line new-cap
            this.block = new this.blockClass(args?.groups);
            render(this.props.rootQuery, this.block);
            return;
        }

        this.block.show();
    }
}
