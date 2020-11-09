import Block from "../components/Block/Block.js";
import { clear, render } from "./renderDOM.js";

export default class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: Block<any> | null;
    private _props: any;
    private _pattern: RegExp;

    constructor(pathname: string, view: any, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;

        pathname.match

        this._pattern = new RegExp("^" + pathname.replace(/:(\w+)/g, "(?<$1>\\w+)") + "$");
    }

    // navigate(pathname: string) {
    //     if (this.match(pathname)) {
    //         this._pathname = pathname;
    //         this.render();
    //     }
    // }

    leave() {
        if (this._block) {
            this._block.hide();
            clear(this._props.rootQuery, this._block);
            this._block = null;
        }
    }

    isEqual(lhs: string, rhs: string) {
        return lhs === rhs;
    }

    match(pathname: string): boolean {
        if (this.isEqual(pathname, this._pathname))
            return true;

        const args = pathname.match(this._pattern);
        if (args)
            return true;

        return false;
    }

    render(pathname: string) {
        if (!this._block) {
            const args = pathname.match(this._pattern);

            this._block = new this._blockClass(args?.groups);
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}