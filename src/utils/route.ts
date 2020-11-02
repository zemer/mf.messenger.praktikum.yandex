import Block from "../components/Block/Block.js";
import { clear, render } from './renderDOM.js';

export default class Route {
    private _pathname: string;
    private _blockClass: any;
    private _block: Block<any> | null;
    private _props: any;

    constructor(pathname: string, view: any, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

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

    match(pathname: string) {
        return this.isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}